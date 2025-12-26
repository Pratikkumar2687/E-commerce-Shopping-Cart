<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('stock_quantity', '>', 0)
            ->latest()
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }
}
