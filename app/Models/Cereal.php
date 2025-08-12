<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Cereal
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property float $price
 * @property string|null $flavor
 * @property array|null $health_benefits
 * @property array $ingredients
 * @property array|null $recipes
 * @property string|null $image_url
 * @property bool $is_featured
 * @property int $stock_quantity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereFlavor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereHealthBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereIngredients($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereRecipes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cereal featured()
 * @method static \Database\Factories\CerealFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Cereal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'flavor',
        'health_benefits',
        'ingredients',
        'recipes',
        'image_url',
        'is_featured',
        'stock_quantity',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'health_benefits' => 'array',
        'ingredients' => 'array',
        'recipes' => 'array',
        'is_featured' => 'boolean',
        'stock_quantity' => 'integer',
    ];

    /**
     * Scope a query to only include featured cereals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}