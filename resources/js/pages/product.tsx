import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Cereal {
    id: number;
    name: string;
    description: string;
    price: number;
    flavor: string;
    health_benefits: string[];
    ingredients: string[];
    recipes: Array<{
        name: string;
        description: string;
    }>;
    image_url: string;
    stock_quantity: number;
}

interface Props {
    cereal: Cereal;
    [key: string]: unknown;
}

export default function Product({ cereal }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const handleAddToCart = () => {
        router.post(route('cart.store'), {
            cereal_id: cereal.id,
            quantity: quantity
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Could show a success message here
            }
        });
    };

    const tabs = [
        { id: 'description', label: '📝 Description' },
        { id: 'ingredients', label: '🌱 Ingredients' },
        { id: 'recipes', label: '👩‍🍳 Recipes' },
    ];

    return (
        <>
            <Head title={`${cereal.name} - CerealCraze`} />
            
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
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                🛒 Cart
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <Link href={route('home')} className="hover:text-orange-600">Home</Link>
                    <span>›</span>
                    <Link href={route('shop.index')} className="hover:text-orange-600">Shop</Link>
                    <span>›</span>
                    <span className="text-gray-900">{cereal.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            <img 
                                src={cereal.image_url} 
                                alt={cereal.name}
                                className="w-full h-full object-cover"
                            />
                            {cereal.stock_quantity === 0 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">Out of Stock</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{cereal.name}</h1>
                                <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                    {cereal.flavor}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-orange-600 mb-4">
                                ${cereal.price}
                            </div>
                            
                            {/* Health Benefits */}
                            {cereal.health_benefits && cereal.health_benefits.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {cereal.health_benefits.map((benefit, index) => (
                                        <span key={index} className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                            ✓ {benefit}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${cereal.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                                {cereal.stock_quantity > 0 ? `${cereal.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        {/* Quantity and Add to Cart */}
                        {cereal.stock_quantity > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                        >
                                            −
                                        </button>
                                        <input 
                                            type="number" 
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                            className="w-16 text-center border-0 focus:outline-none focus:ring-0"
                                            min="1"
                                            max="10"
                                        />
                                        <button 
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <Button 
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                                >
                                    🛒 Add to Cart - ${(cereal.price * quantity).toFixed(2)}
                                </Button>
                            </div>
                        )}

                        {cereal.stock_quantity === 0 && (
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                                <p className="text-gray-600 mb-2">This product is currently out of stock</p>
                                <Button variant="outline" disabled>
                                    Notify When Available
                                </Button>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="flex space-x-4 pt-4 border-t">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>🚚</span>
                                <span>Free delivery within 3km</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>💚</span>
                                <span>Natural ingredients</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mt-16">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-orange-600 text-orange-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="py-8">
                        {activeTab === 'description' && (
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {cereal.description}
                                </p>
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">🌱 Ingredients</h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {cereal.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                            <span className="text-green-600">✓</span>
                                            <span className="text-gray-700">{ingredient}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'recipes' && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">👩‍🍳 Suggested Recipes</h3>
                                {cereal.recipes && cereal.recipes.length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {cereal.recipes.map((recipe, index) => (
                                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {recipe.name}
                                                </h4>
                                                <p className="text-gray-600">
                                                    {recipe.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">🍽️</div>
                                        <p className="text-gray-600">
                                            Perfect on its own with your favorite milk or yogurt!
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Back to Shop */}
                <div className="mt-12 text-center">
                    <Link href={route('shop.index')}>
                        <Button variant="outline" size="lg">
                            ← Back to Shop
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}