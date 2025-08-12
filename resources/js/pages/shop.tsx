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
    image_url: string;
    stock_quantity: number;
}

interface PaginatedCereals {
    data: Cereal[];
    current_page: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    cereals: PaginatedCereals;
    flavors: string[];
    filters: {
        flavor?: string;
        min_price?: string;
        max_price?: string;
        sort: string;
        direction: string;
    };
    [key: string]: unknown;
}

export default function Shop({ cereals, flavors, filters }: Props) {
    const [localFilters, setLocalFilters] = useState({
        flavor: filters.flavor || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        sort: filters.sort || 'name',
        direction: filters.direction || 'asc'
    });

    const applyFilters = () => {
        const params = new URLSearchParams();
        
        if (localFilters.flavor) params.set('flavor', localFilters.flavor);
        if (localFilters.min_price) params.set('min_price', localFilters.min_price);
        if (localFilters.max_price) params.set('max_price', localFilters.max_price);
        if (localFilters.sort) params.set('sort', localFilters.sort);
        if (localFilters.direction) params.set('direction', localFilters.direction);

        router.get(route('shop.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({
            flavor: '',
            min_price: '',
            max_price: '',
            sort: 'name',
            direction: 'asc'
        });
        router.get(route('shop.index'));
    };

    const handleAddToCart = (cerealId: number) => {
        router.post(route('cart.store'), {
            cereal_id: cerealId,
            quantity: 1
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Shop - CerealCraze" />
            
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
                            <Link href={route('cart.index')} className="text-gray-700 hover:text-orange-600 transition-colors">
                                🛒 Cart
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">🛍️ Shop All Cereals</h2>
                    <p className="text-lg text-gray-600">Discover our full collection of premium breakfast cereals</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filters</h3>
                            
                            {/* Flavor Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Flavor</label>
                                <select 
                                    value={localFilters.flavor}
                                    onChange={(e) => setLocalFilters({...localFilters, flavor: e.target.value})}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">All Flavors</option>
                                    {flavors.map((flavor) => (
                                        <option key={flavor} value={flavor}>{flavor}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={localFilters.min_price}
                                        onChange={(e) => setLocalFilters({...localFilters, min_price: e.target.value})}
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        step="0.01"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={localFilters.max_price}
                                        onChange={(e) => setLocalFilters({...localFilters, max_price: e.target.value})}
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select 
                                    value={`${localFilters.sort}-${localFilters.direction}`}
                                    onChange={(e) => {
                                        const [sort, direction] = e.target.value.split('-');
                                        setLocalFilters({...localFilters, sort, direction});
                                    }}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="price-asc">Price (Low to High)</option>
                                    <option value="price-desc">Price (High to Low)</option>
                                </select>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex flex-col gap-2">
                                <Button 
                                    onClick={applyFilters}
                                    className="bg-orange-600 hover:bg-orange-700 w-full"
                                >
                                    Apply Filters
                                </Button>
                                <Button 
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-gray-600">
                                Showing {cereals.data.length} cereals
                                {filters.flavor && ` filtered by ${filters.flavor}`}
                            </p>
                        </div>

                        {/* Products Grid */}
                        {cereals.data.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {cereals.data.map((cereal) => (
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
                                            {cereal.stock_quantity === 0 && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                    <span className="text-white font-semibold">Out of Stock</span>
                                                </div>
                                            )}
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
                                                    disabled={cereal.stock_quantity === 0}
                                                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400"
                                                >
                                                    {cereal.stock_quantity > 0 ? 'Add to Cart' : 'Sold Out'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cereals found</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                                <Button onClick={clearFilters} variant="outline">
                                    Clear Filters
                                </Button>
                            </div>
                        )}

                        {/* Pagination */}
                        {cereals.last_page > 1 && (
                            <div className="flex justify-center items-center space-x-2">
                                {cereals.links.map((link, index) => {
                                    if (!link.url) {
                                        return (
                                            <span 
                                                key={index}
                                                className="px-3 py-2 text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 rounded transition-colors ${
                                                link.active 
                                                    ? 'bg-orange-600 text-white' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}