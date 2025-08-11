'use client';

import { useState } from 'react';
import { Star, Heart, ShoppingCart, Filter, Search, Leaf } from 'lucide-react';
import Container from './Container';
import Grid from './Grid';
import Card from './Card';
import Button from './Button';
import { addToCart } from '@/lib/cart';

const products = [
  {
    id: 1,
    name: 'Neem & Shea Hair Growth Serum',
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 234,
    badge: 'Best Seller',
    description: 'Traditional Ghanaian neem and shea butter formula for accelerated hair growth.',
    ingredients: ['Neem Extract', 'Shea Butter', 'Coconut Oil', 'Hibiscus'],
    category: 'Hair Growth'
  },
  {
    id: 2,
    name: 'Baobab Scalp Treatment Oil',
    price: 38,
    rating: 4.9,
    reviews: 189,
    badge: 'New',
    description: 'Nutrient-rich baobab oil to nourish and heal damaged scalp conditions.',
    ingredients: ['Baobab Oil', 'Moringa Extract', 'Jojoba Oil'],
    category: 'Scalp Care'
  },
  {
    id: 3,
    name: 'Hibiscus Curl Defining Cream',
    price: 32,
    rating: 4.7,
    reviews: 156,
    description: 'Define and moisturize curls with this traditional hibiscus-infused cream.',
    ingredients: ['Hibiscus Extract', 'Aloe Vera', 'Coconut Cream'],
    category: 'Styling'
  },
  {
    id: 4,
    name: 'Complete Hair Care Bundle',
    price: 89,
    originalPrice: 115,
    rating: 4.9,
    reviews: 312,
    badge: 'Bundle',
    description: 'Everything you need for a complete natural hair transformation.',
    ingredients: ['All Natural', 'Ethically Sourced', '3 Products'],
    category: 'Bundles'
  },
  {
    id: 5,
    name: 'Moringa Strengthening Mask',
    price: 28,
    rating: 4.6,
    reviews: 98,
    description: 'Deep conditioning mask with moringa extract for stronger, healthier hair.',
    ingredients: ['Moringa Extract', 'Shea Butter', 'Honey'],
    category: 'Hair Masks'
  },
  {
    id: 6,
    name: 'Black Soap Hair Cleanser',
    price: 24,
    rating: 4.5,
    reviews: 145,
    description: 'Gentle cleansing with traditional African black soap and herbs.',
    ingredients: ['Black Soap', 'Tea Tree Oil', 'Peppermint'],
    category: 'Cleansing'
  }
];

const categories = ['All', 'Hair Growth', 'Scalp Care', 'Styling', 'Hair Masks', 'Cleansing', 'Bundles'];

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-responsive-xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-responsive-sm text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of natural hair care products, crafted with traditional 
            Ghanaian herbs and ethically sourced from local farming cooperatives.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-outline flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} gap="md">
          {filteredProducts.map((product) => (
            <Card key={product.id} variant="product" padding="none" hover>
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-600">Product Image</p>
                  </div>
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                    product.badge === 'Best Seller' ? 'bg-red-500 text-white' :
                    product.badge === 'New' ? 'bg-green-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>

                {/* Quick Add to Cart */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        ingredients: product.ingredients
                      });
                      
                      // Show success feedback
                      alert(`✅ ${product.name} added to cart!`);
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.ingredients.slice(0, 2).map((ingredient, index) => (
                    <span key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                      {ingredient}
                    </span>
                  ))}
                  {product.ingredients.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{product.ingredients.length - 2} more
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm font-semibold text-green-600">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}