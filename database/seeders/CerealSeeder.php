<?php

namespace Database\Seeders;

use App\Models\Cereal;
use Illuminate\Database\Seeder;

class CerealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create featured cereals
        Cereal::factory()->featured()->create([
            'name' => 'Golden Honey Crunch',
            'description' => 'Start your morning with the perfect blend of crispy whole grain clusters and natural honey sweetness. Each bite delivers a satisfying crunch with wholesome nutrition.',
            'price' => 8.99,
            'flavor' => 'Honey',
            'health_benefits' => ['High Fiber', 'Whole Grains', 'Natural Sweeteners'],
            'ingredients' => ['Whole grain oats', 'Honey', 'Brown rice', 'Almonds', 'Natural vanilla', 'Sea salt', 'Vitamin D'],
            'image_url' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
        ]);

        Cereal::factory()->featured()->create([
            'name' => 'Chocolate Dream Clusters',
            'description' => 'Indulge in rich chocolate flavor while getting essential nutrients. Made with real cocoa and fortified with vitamins for a guilt-free breakfast treat.',
            'price' => 9.49,
            'flavor' => 'Chocolate',
            'health_benefits' => ['Antioxidants', 'Iron Fortified', 'Protein Rich'],
            'ingredients' => ['Whole grain wheat', 'Cocoa powder', 'Sugar', 'Rice flour', 'Natural chocolate flavor', 'Iron', 'B vitamins'],
            'image_url' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        ]);

        Cereal::factory()->featured()->create([
            'name' => 'Berry Burst Granola',
            'description' => 'A delightful mix of crunchy granola clusters with real dried berries. Packed with fiber and natural fruit flavors for a nutritious start to your day.',
            'price' => 10.99,
            'flavor' => 'Mixed Berry',
            'health_benefits' => ['High Fiber', 'Antioxidants', 'Organic'],
            'ingredients' => ['Organic oats', 'Dried strawberries', 'Dried blueberries', 'Maple syrup', 'Sunflower seeds', 'Coconut flakes'],
            'image_url' => 'https://images.unsplash.com/photo-1571741140674-5c2d5fc0de99?w=400&h=400&fit=crop',
        ]);

        // Create additional regular cereals
        Cereal::factory(12)->create();
    }
}