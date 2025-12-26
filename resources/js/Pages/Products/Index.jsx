// File: resources/js/Pages/Products/Index.jsx

import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function ProductsIndex({ auth, products }) {
    const [quantities, setQuantities] = useState({});
    const { post, processing } = useForm();

    const handleQuantityChange = (productId, value) => {
        setQuantities({
            ...quantities,
            [productId]: Math.max(1, parseInt(value) || 1)
        });
    };

    const handleAddToCart = (productId) => {
        const quantity = quantities[productId] || 1;
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: quantity,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Products
                    </h2>
                    <Link
                        href={route('cart.index')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        View Cart
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {products.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <p className="text-gray-600">No products available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {product.name}
                                            </h3>
                                            <span className="text-xl font-bold text-blue-600">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                        </div>

                                        {product.description && (
                                            <p className="text-gray-600 text-sm mb-4">
                                                {product.description}
                                            </p>
                                        )}

                                        <div className="flex items-center mb-4">
                                            <span className="text-sm text-gray-600">
                                                Stock:
                                            </span>
                                            <span
                                                className={`ml-2 text-sm font-medium ${product.stock_quantity <= 5
                                                    ? 'text-red-600'
                                                    : 'text-green-600'
                                                    }`}
                                            >
                                                {product.stock_quantity} available
                                            </span>
                                        </div>

                                        {product.stock_quantity <= 5 && (
                                            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded">
                                                <p className="text-xs text-red-600">
                                                    Low stock - order soon!
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max={product.stock_quantity}
                                                value={quantities[product.id] || 1}
                                                onChange={(e) =>
                                                    handleQuantityChange(product.id, e.target.value)
                                                }
                                                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={processing || product.stock_quantity === 0}
                                                className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {product.stock_quantity === 0
                                                    ? 'Out of Stock'
                                                    : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}