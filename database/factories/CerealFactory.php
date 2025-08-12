<?php

namespace Database\Factories;

use App\Models\Cereal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cereal>
 */
class CerealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Honey', 'Cinnamon', 'Fruit', 'Original'];
        $healthBenefits = [
            ['High Fiber', 'Low Sugar'],
            ['Whole Grains', 'Vitamin D'],
            ['Protein Rich', 'Iron Fortified'],
            ['Gluten Free', 'Organic'],
            ['Heart Healthy', 'Antioxidants']
        ];
        
        return [
            'name' => $this->faker->randomElement([
                'Crispy Morning Crunch',
                'Golden Honey Loops',
                'Chocolate Dream Flakes',
                'Berry Burst Clusters',
                'Vanilla Almond Squares',
                'Cinnamon Swirl Rings',
                'Fruity Rainbow Puffs',
                'Nutty Granola Bites'
            ]),
            'description' => $this->faker->text(200),
            'price' => $this->faker->randomFloat(2, 3.99, 12.99),
            'flavor' => $this->faker->randomElement($flavors),
            'health_benefits' => $this->faker->randomElement($healthBenefits),
            'ingredients' => [
                'Whole grain oats',
                'Sugar',
                'Salt',
                'Natural flavoring',
                'Vitamins and minerals'
            ],
            'recipes' => [
                [
                    'name' => 'Breakfast Parfait',
                    'description' => 'Layer cereal with yogurt and fresh berries'
                ],
                [
                    'name' => 'Cereal Bars',
                    'description' => 'Mix with honey and press into bars for a portable snack'
                ]
            ],
            'image_url' => 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop',
            'is_featured' => $this->faker->boolean(30),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the cereal is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}