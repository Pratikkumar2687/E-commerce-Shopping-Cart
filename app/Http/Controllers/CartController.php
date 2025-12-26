<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Jobs\SendLowStockNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = auth()->user()
            ->cartItems()
            ->with('product')
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {

        // dd([
        //     'user_id' => auth()->id(),
        //     'data' => $request->all(),
        // ]);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available.');
        }

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
            ],
            [
                'quantity' => DB::raw("quantity + {$request->quantity}"),
            ]
        );

        $cartItem->refresh();

        if ($cartItem->quantity > $product->stock_quantity) {
            $cartItem->quantity = $product->stock_quantity;
            $cartItem->save();

            return back()->with('error', 'Adjusted quantity to available stock.');
        }

        return back()->with('success', 'Product added to cart successfully.');
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cartItem->product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available.');
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated successfully.');
    }

    public function destroy(CartItem $cartItem): RedirectResponse
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }

    public function checkout(): RedirectResponse
    {
        $cartItems = auth()->user()
            ->cartItems()
            ->with('product')
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        DB::transaction(function () use ($cartItems) {
            $total = 0;

            foreach ($cartItems as $item) {
                if ($item->product->stock_quantity < $item->quantity) {
                    throw new \Exception("Not enough stock for {$item->product->name}");
                }

                $total += $item->quantity * $item->product->price;
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'total' => $total,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $product = $item->product;
                $product->decrement('stock_quantity', $item->quantity);

                if ($product->isLowStock() && !$product->low_stock_notified) {
                    SendLowStockNotification::dispatch($product);
                    $product->update(['low_stock_notified' => true]);
                }

                $item->delete();
            }
        });

        return redirect()
            ->route('products.index')
            ->with('success', 'Order placed successfully!');
    }
}
