// Simple cart management for demo purposes

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  ingredients: string[];
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('regrowx_cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  localStorage.setItem('regrowx_cart', JSON.stringify(cart));
  
  // Trigger cart update event
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('regrowx_cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('regrowx_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  }
};

export const clearCart = (): void => {
  localStorage.removeItem('regrowx_cart');
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
};

export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  return getCart().reduce((count, item) => count + item.quantity, 0);
};