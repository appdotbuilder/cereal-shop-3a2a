import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Cereal {
    id: number;
    name: string;
    price: number;
    image_url: string;
    flavor: string;
}

interface CartItem {
    id: number;
    quantity: number;
    cereal: Cereal;
}

interface Props {
    cartItems: CartItem[];
    [key: string]: unknown;
}

export default function Cart({ cartItems }: Props) {
    const updateQuantity = (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > 10) return;
        
        router.patch(route('cart.update', cartItemId), {
            quantity: newQuantity
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeItem = (cartItemId: number) => {
        router.delete(route('cart.destroy', cartItemId), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * item.cereal.price), 0);
    const estimatedDelivery = 4.99; // Base delivery rate
    const finalTotal = subtotal + estimatedDelivery;

    return (
        <>
            <Head title="Shopping Cart - CerealCraze" />
            
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <span className="text-2xl">🥣</span>
                            <h1 className="text-2xl font-bold text-orange-600">CerealCraze</h1>
                        </Link>
                        <nav className="flex items-center space-x-6">
                            <Link href={route('home')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                Home
                            </Link>
                            <Link href={route('shop.index')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                Shop
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">🛒 Shopping Cart</h2>
                    <p className="text-lg text-gray-600">Review your items and proceed to checkout</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={item.cereal.image_url} 
                                                alt={item.cereal.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                        {item.cereal.name}
                                                    </h3>
                                                    <p className="text-sm text-orange-600 mb-2">
                                                        {item.cereal.flavor} Flavor
                                                    </p>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ${item.cereal.price} each
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-orange-600">
                                                        ${(item.cereal.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm text-gray-600">Quantity:</span>
                                                    <div className="flex items-center border border-gray-300 rounded-md">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-3 py-1 text-center min-w-[3rem] border-x border-gray-300">
                                                            {item.quantity}
                                                        </span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    🗑️ Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Order Summary</h3>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Estimated Delivery</span>
                                        <span>${estimatedDelivery.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                                            <span>Total</span>
                                            <span>${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link href={route('checkout.index')}>
                                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">
                                            🚀 Proceed to Checkout
                                        </Button>
                                    </Link>
                                    <Link href={route('shop.index')}>
                                        <Button variant="outline" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>

                                {/* Delivery Info */}
                                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                                    <h4 className="text-sm font-semibold text-orange-800 mb-2">🚚 Delivery Information</h4>
                                    <div className="text-sm text-orange-700 space-y-1">
                                        <p>• Free delivery within 3km: $4.99</p>
                                        <p>• Extended delivery: $8.99</p>
                                        <p>• Estimated delivery: 1-2 business days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-8xl mb-4">🛒</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Looks like you haven't added any cereals to your cart yet. 
                            Start shopping to build your perfect breakfast collection!
                        </p>
                        <Link href={route('shop.index')}>
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                                🛍️ Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}