// File: resources/js/Pages/Cart/Index.jsx

import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function CartIndex({ auth, cartItems, total }) {
    const [updatingItem, setUpdatingItem] = useState(null);
    const { delete: destroy, processing: deleting } = useForm();
    const { post, processing: checkingOut } = useForm();

    const handleUpdateQuantity = (item, newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.product.stock_quantity) {
            alert(`Only ${item.product.stock_quantity} available in stock`);
            return;
        }

        setUpdatingItem(item.id);
        router.patch(
            route('cart.update', item.id),
            { quantity: newQuantity },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingItem(null),
            }
        );
    };

    const handleRemoveItem = (itemId) => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            destroy(route('cart.destroy', itemId), {
                preserveScroll: true,
            });
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        if (confirm('Proceed with checkout?')) {
            post(route('cart.checkout'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Shopping Cart
                    </h2>
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Continue Shopping
                    </Link>
                </div>
            }
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {cartItems.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    Your cart is empty
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Start adding some products to your cart.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {item.product.name}
                                                    </h3>
                                                    {item.product.description && (
                                                        <p className="mt-1 text-sm text-gray-600">
                                                            {item.product.description}
                                                        </p>
                                                    )}
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        Price: $
                                                        {parseFloat(item.product.price).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Available: {item.product.stock_quantity}
                                                    </p>
                                                </div>
                                                <div className="ml-4 flex flex-col items-end">
                                                    <p className="text-lg font-bold text-gray-900">
                                                        $
                                                        {(
                                                            item.quantity * item.product.price
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-600">
                                                        Quantity:
                                                    </label>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        disabled={
                                                            updatingItem === item.id ||
                                                            item.quantity <= 1
                                                        }
                                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1 bg-gray-100 rounded-md min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        disabled={
                                                            updatingItem === item.id ||
                                                            item.quantity >=
                                                            item.product.stock_quantity
                                                        }
                                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={deleting}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg sticky top-6">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Order Summary
                                        </h3>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                    Items ({cartItems.length})
                                                </span>
                                                <span className="text-gray-900">
                                                    ${parseFloat(total).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="border-t pt-2">
                                                <div className="flex justify-between font-semibold">
                                                    <span className="text-gray-900">Total</span>
                                                    <span className="text-blue-600 text-lg">
                                                        ${parseFloat(total).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            disabled={checkingOut}
                                            className="w-full inline-flex justify-center items-center px-4 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                        >
                                            {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                                        </button>

                                        <Link
                                            href={route('products.index')}
                                            className="mt-3 w-full inline-flex justify-center items-center px-4 py-3 bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 transition ease-in-out duration-150"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}