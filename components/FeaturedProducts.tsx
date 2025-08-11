'use client';

import Link from 'next/link';
import { Star, Heart, ShoppingCart, Leaf } from 'lucide-react';
import { addToCart } from '@/lib/cart';

const products = [
  {
    id: 1,
    name: 'Neem & Shea Hair Growth Serum',
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 234,
    image: '/api/placeholder/300/300',
    badge: 'Best Seller',
    description: 'Traditional Ghanaian neem and shea butter formula for accelerated hair growth.',
    ingredients: ['Neem Extract', 'Shea Butter', 'Coconut Oil', 'Hibiscus']
  },
  {
    id: 2,
    name: 'Baobab Scalp Treatment Oil',
    price: 38,
    rating: 4.9,
    reviews: 189,
    image: '/api/placeholder/300/300',
    badge: 'New',
    description: 'Nutrient-rich baobab oil to nourish and heal damaged scalp conditions.',
    ingredients: ['Baobab Oil', 'Moringa Extract', 'Jojoba Oil']
  },
  {
    id: 3,
    name: 'Hibiscus Curl Defining Cream',
    price: 32,
    rating: 4.7,
    reviews: 156,
    image: '/api/placeholder/300/300',
    description: 'Define and moisturize curls with this traditional hibiscus-infused cream.',
    ingredients: ['Hibiscus Extract', 'Aloe Vera', 'Coconut Cream']
  },
  {
    id: 4,
    name: 'Complete Hair Care Bundle',
    price: 89,
    originalPrice: 115,
    rating: 4.9,
    reviews: 312,
    image: '/api/placeholder/300/300',
    badge: 'Bundle',
    description: 'Everything you need for a complete natural hair transformation.',
    ingredients: ['All Natural', 'Ethically Sourced', '3 Products']
  }
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our most popular natural hair care products, crafted with traditional 
              Ghanaian herbs and ethically sourced from local farming cooperatives.
            </p>
          </div>
          <Link href="/products" className="btn-outline hidden sm:block">
            View All Products
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card-product group">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {/* Placeholder for product image */}
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
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-12 sm:hidden">
          <Link href="/products" className="btn-primary w-full inline-block text-center">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

