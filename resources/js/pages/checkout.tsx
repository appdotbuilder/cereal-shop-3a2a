import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Cereal {
    id: number;
    name: string;
    price: number;
    image_url: string;
}

interface CartItem {
    id: number;
    quantity: number;
    cereal: Cereal;
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    baseDelivery: number;
    extendedDelivery: number;
    [key: string]: unknown;
}



export default function Checkout({ cartItems, subtotal, baseDelivery, extendedDelivery }: Props) {
    const [selectedDelivery, setSelectedDelivery] = useState<'base' | 'extended'>('base');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        delivery_option: 'base'
    });

    const deliveryCost = selectedDelivery === 'base' ? baseDelivery : extendedDelivery;
    const total = subtotal + deliveryCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = {
            ...data,
            delivery_option: selectedDelivery
        };

        post(route('checkout.store'), {
            ...formData,
            onSuccess: () => {
                // Success is handled by the redirect from the controller
            }
        });
    };

    const handleDeliveryChange = (option: 'base' | 'extended') => {
        setSelectedDelivery(option);
        setData('delivery_option', option);
    };

    return (
        <>
            <Head title="Checkout - CerealCraze" />
            
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <span className="text-2xl">🥣</span>
                            <h1 className="text-2xl font-bold text-orange-600">CerealCraze</h1>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Checkout</h2>
                    <p className="text-lg text-gray-600">Complete your order and get your cereals delivered</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">👤 Contact Information</h3>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="your@email.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">🏠 Delivery Address</h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Address *
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Street address, city, state, postal code"
                                        required
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Delivery Options */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">🚚 Delivery Options</h3>
                                
                                <div className="space-y-3">
                                    <div 
                                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedDelivery === 'base' 
                                                ? 'border-orange-600 bg-orange-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => handleDeliveryChange('base')}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input 
                                                type="radio" 
                                                checked={selectedDelivery === 'base'}
                                                onChange={() => handleDeliveryChange('base')}
                                                className="text-orange-600 focus:ring-orange-500"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-medium text-gray-900">Standard Delivery (within 3km)</h4>
                                                    <span className="font-semibold text-gray-900">${baseDelivery.toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">1-2 business days</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedDelivery === 'extended' 
                                                ? 'border-orange-600 bg-orange-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => handleDeliveryChange('extended')}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input 
                                                type="radio" 
                                                checked={selectedDelivery === 'extended'}
                                                onChange={() => handleDeliveryChange('extended')}
                                                className="text-orange-600 focus:ring-orange-500"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-medium text-gray-900">Extended Delivery (beyond 3km)</h4>
                                                    <span className="font-semibold text-gray-900">${extendedDelivery.toFixed(2)}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">2-3 business days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <Button 
                                type="submit"
                                disabled={processing}
                                size="lg"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-4"
                            >
                                {processing ? 'Processing...' : `🎉 Place Order - $${total.toFixed(2)}`}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">📦 Your Order</h3>
                            
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={item.cereal.image_url} 
                                                alt={item.cereal.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 truncate">
                                                {item.cereal.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity} × ${item.cereal.price}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                                ${(item.cereal.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Order Total</h3>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span>${deliveryCost.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p>💳 Payment on delivery</p>
                                <p>📧 Confirmation email will be sent</p>
                                <p>🔒 Your information is secure</p>
                            </div>
                        </div>

                        {/* Back to Cart */}
                        <Link href={route('cart.index')}>
                            <Button variant="outline" className="w-full">
                                ← Back to Cart
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}