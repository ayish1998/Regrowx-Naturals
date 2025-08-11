'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Leaf } from 'lucide-react';
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, type CartItem } from '@/lib/cart';

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart on component mount
  useEffect(() => {
    setItems(getCart());
    
    const handleCartUpdate = () => {
      setItems(getCart());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    updateCartQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);
  const shipping = subtotal > 50 ? 0 : 8;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Discover our natural hair care products and start your transformation journey.
            </p>
            <Link href="/products" className="btn-primary">
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Link href="/products" className="btn-outline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="card p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-primary-600" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                      
                      {/* Ingredients */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.ingredients.slice(0, 2).map((ingredient, index) => (
                          <span key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                            {ingredient}
                          </span>
                        ))}
                        {item.ingredients.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{item.ingredients.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-gray-900">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        {item.originalPrice && (
                          <span className="text-sm font-semibold text-green-600">
                            Save ${item.originalPrice - item.price}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {subtotal < 50 && (
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full mb-4 inline-block text-center">
                Proceed to Checkout
              </Link>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>🔒 Secure checkout</span>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span>SSL encrypted</span>
                  <span>•</span>
                  <span>Money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-product group">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-primary-600" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Product {i}</h3>
                  <p className="text-gray-600 text-sm mb-2">Natural hair care solution</p>
                  <div className="text-lg font-bold text-gray-900">$32</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}