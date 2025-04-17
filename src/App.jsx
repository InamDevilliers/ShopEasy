import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, User, ChevronDown, ChevronUp, Trash2, Plus, Minus } from 'lucide-react';

import DeskLamp from './assets/desk-light.jpg';
import WirelessHeadphone from './assets/wireless-headphone2.jpg';
import CottonTshirt from './assets/cotton-tshirt.avif';
import SmartWatch from './assets/smart-watch1.jpg';
import CoffeeMug from './assets/coffee-mug.jpg';
import LeatherWallet from './assets/leather-wallet.jpg';
import EarBuds from './assets/ear-buds.jpg';

// Mock product data
const products = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    price: 59.99,
    image: DeskLamp,
    category: "Home",
    description: "A sleek and adjustable desk lamp perfect for your workspace."
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129.99,
    // image: "/api/placeholder/300/300",
    image: WirelessHeadphone,
    category: "Electronics",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life."
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 24.99,
    image: CottonTshirt,
    category: "Clothing",
    description: "Comfortable 100% organic cotton t-shirt available in multiple colors."
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    image: SmartWatch,
    category: "Electronics",
    description: "Track your fitness goals and stay connected with this premium smart watch."
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug",
    price: 18.99,
    image: CoffeeMug,
    category: "Kitchen",
    description: "Hand-crafted ceramic coffee mug that keeps your drinks warm longer."
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 45.99,
    image: LeatherWallet,
    category: "Accessories",
    description: "Genuine leather wallet with RFID blocking technology."
  },
  {
    id: 7,
    name: "Ear Buds",
    price: 98.99,
    image: EarBuds,
    category: "Electronics",
    description: "Premium noise-cancelling ear buds with 24-hour battery life."
  }
];

// Product categories
const categories = ["All", "Home", "Electronics", "Clothing", "Kitchen", "Accessories"];

export default function ShoppingWebsite() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCheckout, setIsCheckout] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if already in cart
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item if not in cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button className="md:hidden mr-4" onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-indigo-600">ShopEasy</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block p-2 text-gray-500 hover:text-indigo-600 cursor-pointer">
                <User size={24} />
              </button>
              <button className="p-2 text-gray-500 hover:text-indigo-600 cursor-pointer">
                <Heart size={24} />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-indigo-600 relative cursor-pointer"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex mt-4 space-x-6">
            {categories.map(category => (
              <button
                key={category}
                className={`text-sm font-medium ${selectedCategory === category ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'} cursor-pointer`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-20 bg-opacity-50"
          style={{
            animation: `${showCart ? 'slideOutMenu' : 'slideInMenu'} 0.3s ease-in-out forwards`,
            backgroundColor: 'rgba(100, 100, 100, 0.1)'
          }}
          onClick={() => setShowMenu(false)}
        >
          <div className="bg-white h-full w-64 p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setShowMenu(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`block w-full text-left py-2 ${selectedCategory === category ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowMenu(false);
                  }}
                >
                  {category}
                </button>
              ))}
              <hr className="my-4" />
              <button className="flex items-center text-gray-600 py-2">
                <User size={20} className="mr-2" />
                <span>Account</span>
              </button>
              <button className="flex items-center text-gray-600 py-2">
                <Heart size={20} className="mr-2" />
                <span>Favorites</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 z-30"
          style={{
            backgroundColor: 'rgba(100, 100, 100, 0.5)',
            animation: `${showCart ? 'fadeIn' : 'fadeOut'} 0.3s ease-in-out forwards`
          }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            style={{
              animation: `${showCart ? 'slideIn' : 'slideOut'} 0.3s ease-in-out forwards`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
              <button className='cursor-pointer' onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button
                            className="text-gray-500 p-1 cursor-pointer"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="text-gray-500 p-1 cursor-pointer"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
                    onClick={() => {
                      setIsCheckout(true);
                      setShowCart(false);
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isCheckout ? (
          <CheckoutForm cart={cart} total={cartTotal} onBack={() => setIsCheckout(false)} />
        ) : (
          <>
            {/* Hero Banner */}
            <section className="mb-12">
              <div className="bg-indigo-100 rounded-xl p-8 md:p-12">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Spring Collection 2025</h2>
                  <p className="text-lg text-gray-600 mb-6">Discover our newest products with up to 40% off for a limited time.</p>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer">
                    Shop Now
                  </button>
                </div>
              </div>
            </section>

            {/* Mobile Categories */}
            <div className="md:hidden mb-6 overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedCategory} Products</h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found. Try a different search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopEasy</h3>
              <p className="text-gray-400">Your one-stop destination for quality products at great prices.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none border-l border-t border-b border-gray-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ShopEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      style={{
        animation: 'slideIn 0.5s ease-in-out forwards'
      }}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart
            size={20}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <button
            className="bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 text-sm cursor-pointer"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Checkout Form Component
function CheckoutForm({ cart, total, onBack }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "USA",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });
  const [activeStep, setActiveStep] = useState("shipping");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="mb-6 inline-block p-4 bg-green-100 rounded-full">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
        <p className="text-gray-600 mb-8">Your order has been placed successfully. We've sent you an email with all the details.</p>
        <button
          onClick={onBack}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className='lg:flex'>
        <div className="max-w-4xl mx-auto">
          <button
            className="flex items-center text-indigo-600 font-medium mb-6 cursor-pointer"
            onClick={onBack}
          >
            <ChevronDown className="transform -rotate-90 mr-1" size={20} />
            Back to Shopping
          </button>

          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Steps */}
            <form className="lg:w-2/3">
              {/* Steps Navigation */}
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-3 text-center border-b-2 ${activeStep === "shipping" ? "border-indigo-600 text-indigo-600 font-medium" : "border-gray-200 text-gray-500 cursor-pointer"
                    }`}
                  onClick={() => setActiveStep("shipping")}
                >
                  Shipping
                </button>
                <button
                  className={`flex-1 py-3 text-center border-b-2 ${activeStep === "payment" ? "border-indigo-600 text-indigo-600 font-medium" : "border-gray-200 text-gray-500 cursor-pointer"
                    }`}
                  onClick={() => setActiveStep("payment")}
                >
                  Payment
                </button>
              </div>

              {/* Shipping Form continued */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
                  onClick={() => setActiveStep("payment")}
                >
                  Continue to Payment
                </button>
              </div>
            </form>

            {/* Payment Form */}
            {activeStep === "payment" && (
              <form onSubmit={placeOrder}>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer bg-white">
                      <input type="radio" name="paymentMethod" value="credit" defaultChecked className="mr-3" />
                      <span className="font-medium">Credit Card</span>
                    </label>
                    {/* <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer bg-white">
                      <input type="radio" name="paymentMethod" value="paypal" className="mr-3" />
                      <span className="font-medium">PayPal</span>
                    </label> */}
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="XXX"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setActiveStep("shipping")}
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{item.quantity}×</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Summary Calculation */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>${(total + (total * 0.08)).toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
              <div className="flex">
                <input
                  type="text"
                  id="promoCode"
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 font-medium cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium mb-3">Secure Checkout</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
            </p>
            <div className="flex gap-2">
              <svg className="h-6 w-auto" viewBox="0 0 60 40" fill="none">
                <rect width="60" height="40" rx="4" fill="#E6E6E6" />
                <path d="M17.2 24.5H14.8L13 17.1H15.5L16.5 21.8L17.8 17.1H20.3L17.2 24.5Z" fill="#3C4043" />
                <path d="M20.8 24.5H23.2V17.1H20.8V24.5Z" fill="#3C4043" />
                <path d="M27.8 19.5C27.4 19.3 27 19.2 26.6 19.2C25.3 19.2 24.4 20.1 24.4 21.3C24.4 22.5 25.3 23.4 26.6 23.4C27 23.4 27.4 23.3 27.8 23.1V21.1H26V22.4H26.4V22.7C26.3 22.7 26.1 22.7 26 22.7C25.7 22.7 24.9 22.4 24.9 21.3C24.9 20.2 25.7 19.9 26 19.9C26.2 19.9 26.5 20 26.7 20.1L27.8 19.5Z" fill="#3C4043" />
                <path d="M31.7 22.4C31.6 22.7 31.3 23.4 30.1 23.4C28.9 23.4 28.2 22.6 28.2 21.3C28.2 20 28.9 19.2 30.1 19.2C30.7 19.2 31.3 19.5 31.7 20L32.9 19.1C32.2 18.3 31.2 17.8 30.1 17.8C28.1 17.8 26.6 19.3 26.6 21.3C26.6 23.3 28.1 24.8 30.1 24.8C31.8 24.8 32.8 23.7 33.2 22.7L31.7 22.4Z" fill="#3C4043" />
                <path d="M37.3 24.5H39.7L37 20.8L39.6 17.1H37.2L34.7 20.8V17.1H32.3V24.5H34.7V20.9L37.3 24.5Z" fill="#3C4043" />
                <path d="M44.5 17.1L41.8 24.5H44.2L44.7 23.2H47.3L47.8 24.5H50.2L47.5 17.1H44.5ZM45.2 21.8L46 19.7L46.8 21.8H45.2Z" fill="#3C4043" />
              </svg>
              <svg className="h-6 w-auto" viewBox="0 0 60 40" fill="none">
                <rect width="60" height="40" rx="4" fill="#E6E6E6" />
                <path d="M23.4 13H36.5V27H23.4V13Z" fill="#FF5F00" />
                <path d="M24.4 20C24.4 17 25.8 14.4 28 13C26.3 11.7 24.2 11 22 11C16.5 11 12 15 12 20C12 25 16.5 29 22 29C24.2 29 26.3 28.3 28 27C25.8 25.6 24.4 23 24.4 20Z" fill="#EB001B" />
                <path d="M48 20C48 25 43.5 29 38 29C35.8 29 33.7 28.3 32 27C34.2 25.6 35.6 23 35.6 20C35.6 17 34.2 14.4 32 13C33.7 11.7 35.8 11 38 11C43.5 11 48 15 48 20Z" fill="#F79E1B" />
              </svg>
              <svg className="h-6 w-auto" viewBox="0 0 60 40" fill="none">
                <rect width="60" height="40" rx="4" fill="#E6E6E6" />
                <path d="M17.5 16.5H25.4C29.6 16.5 32.1 18.8 32.1 22.7C32.1 26.6 29.6 29 25.4 29H17.5V16.5ZM21.1 19.4V26.1H25.2C27.3 26.1 28.4 24.9 28.4 22.7C28.4 20.6 27.3 19.4 25.2 19.4H21.1Z" fill="#3C4043" />
                <path d="M33.3 29V16.5H42.8V19.4H36.9V21.3H42.4V24.2H36.9V26.1H42.8V29H33.3Z" fill="#3C4043" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}