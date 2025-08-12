import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Cereal {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    flavor: string;
    health_benefits: string[];
}

interface Props {
    featuredCereals: Cereal[];
    [key: string]: unknown;
}

export default function Welcome({ featuredCereals = [] }: Props) {
    const handleAddToCart = (cerealId: number) => {
        router.post(route('cart.store'), {
            cereal_id: cerealId,
            quantity: 1
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Optional: show success message
            }
        });
    };

    return (
        <>
            <Head title="CerealCraze - Premium Breakfast Cereals" />
            
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">🥣</span>
                            <h1 className="text-2xl font-bold text-orange-600">CerealCraze</h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href={route('shop.index')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                Shop
                            </Link>
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                Cart
                            </Link>
                            <Link href={route('login')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                Login
                            </Link>
                            <Link href={route('register')}>
                                <Button className="bg-orange-600 hover:bg-orange-700">Register</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-50 to-yellow-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Start Your Day with 
                        <span className="text-orange-600"> Premium Cereals</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Discover our collection of wholesome, delicious cereals made with the finest ingredients. 
                        From crunchy granola to sweet honey clusters, we have the perfect breakfast for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('shop.index')}>
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
                                🛍️ Shop Now
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="text-lg px-8 py-3 border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            🌟 View Favorites
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CerealCraze?</h3>
                        <p className="text-lg text-gray-600">We're committed to bringing you the best breakfast experience</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">🌱</div>
                            <h4 className="text-xl font-semibold mb-2">Premium Ingredients</h4>
                            <p className="text-gray-600">All our cereals are made with high-quality, natural ingredients and no artificial preservatives.</p>
                        </div>
                        <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">🚚</div>
                            <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
                            <p className="text-gray-600">Free delivery within 3km, extended delivery available. Fresh cereals delivered right to your door.</p>
                        </div>
                        <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">💚</div>
                            <h4 className="text-xl font-semibold mb-2">Health Focused</h4>
                            <p className="text-gray-600">Packed with vitamins, fiber, and nutrients to fuel your day with energy and wellness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Favorites Section */}
            <section id="featured" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">🌟 Customer Favorites</h3>
                        <p className="text-lg text-gray-600">Our most loved cereals, handpicked by breakfast enthusiasts</p>
                    </div>
                    
                    {featuredCereals.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {featuredCereals.map((cereal) => (
                                <div key={cereal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-200 relative">
                                        <img 
                                            src={cereal.image_url} 
                                            alt={cereal.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                                            ${cereal.price}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-semibold text-gray-900">{cereal.name}</h4>
                                            <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                                {cereal.flavor}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{cereal.description}</p>
                                        {cereal.health_benefits && cereal.health_benefits.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {cereal.health_benefits.slice(0, 2).map((benefit, index) => (
                                                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Link href={route('product.show', cereal.id)} className="flex-1">
                                                <Button variant="outline" className="w-full">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Button 
                                                onClick={() => handleAddToCart(cereal.id)}
                                                className="bg-orange-600 hover:bg-orange-700"
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🥣</div>
                            <p className="text-gray-600 text-lg">Loading our delicious cereals...</p>
                        </div>
                    )}
                    
                    <div className="text-center">
                        <Link href={route('shop.index')}>
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                                View All Cereals →
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="bg-orange-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">🎉 Special Launch Offer!</h3>
                    <p className="text-xl text-orange-100 mb-6">
                        Get free delivery on your first order over $25. Use code: CRUNCHTIME
                    </p>
                    <Link href={route('shop.index')}>
                        <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                            Shop Now & Save
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🥣</span>
                                <h4 className="text-xl font-bold">CerealCraze</h4>
                            </div>
                            <p className="text-gray-400">
                                Premium breakfast cereals delivered fresh to your doorstep. Start every morning right!
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Shop</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href={route('shop.index')} className="hover:text-white">All Cereals</Link></li>
                                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                                <li><a href="#" className="hover:text-white">Health Focused</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Support</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Delivery Info</a></li>
                                <li><a href="#" className="hover:text-white">Returns</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Connect</h5>
                            <p className="text-gray-400 mb-4">
                                Stay updated with our latest products and offers!
                            </p>
                            <div className="flex space-x-4">
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📧</span>
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📱</span>
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 CerealCraze. All rights reserved. Made with 💚 for breakfast lovers.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}