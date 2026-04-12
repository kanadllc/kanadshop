import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ChevronLeft, ChevronRight, Phone, Mail, Heart, ShoppingCart, Menu, Truck, Shield, Clock, CreditCard, User, Grid, List, Filter, MapPin, LayoutDashboard, Users, Package, Settings, LogOut, ShoppingBag, Activity, DollarSign } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    price: '$299.99',
    oldPrice: '$349.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500',
    rating: 5,
    badge: 'Sale'
  },
  {
    id: 2,
    title: 'Smart Fitness Watch Series 7',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500',
    rating: 4,
  },
  {
    id: 3,
    title: 'Professional DSLR Camera',
    price: '$899.99',
    oldPrice: '$1099.99',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500',
    rating: 5,
    badge: '-18%'
  },
  {
    id: 4,
    title: 'Minimalist Leather Backpack',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
    rating: 4,
  },
  {
    id: 5,
    title: 'Mechanical Gaming Keyboard',
    price: '$129.99',
    oldPrice: '$159.99',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=500',
    rating: 5,
    badge: 'Hot'
  },
  {
    id: 6,
    title: 'Ultra HD 4K Monitor',
    price: '$349.99',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500',
    rating: 4,
  },
  {
    id: 7,
    title: 'Wireless Gaming Mouse',
    price: '$59.99',
    oldPrice: '$79.99',
    image: 'https://images.unsplash.com/photo-1527814050087-179f376dd0e7?auto=format&fit=crop&q=80&w=500',
    rating: 4,
    badge: 'Sale'
  },
  {
    id: 8,
    title: 'Portable Bluetooth Speaker',
    price: '$45.99',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=500',
    rating: 5,
  },
  {
    id: 9,
    title: 'Smart Home Hub',
    price: '$149.99',
    oldPrice: '$199.99',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=500',
    rating: 4,
    badge: '-25%'
  }
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=200' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=200' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=200' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=200' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=200' },
  { name: 'Toys', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=200' },
];

const heroSlides = [
  {
    id: 1,
    subheading: 'Top Brands 2026',
    title: 'Smartphones & Accessories',
    buttonLabel: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    subheading: 'Weekend Deal',
    title: 'Up to 50% Off on Electronics',
    buttonLabel: 'Discover Now',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200'
  }
];

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Wardrobe Staples for 2026',
    excerpt: 'Discover the timeless pieces that will elevate your everyday style and keep you looking sharp year-round.',
    date: 'April 10, 2026',
    author: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Sustainable Fashion: Why It Matters',
    excerpt: 'Learn about our commitment to eco-friendly materials and how you can build a more sustainable closet.',
    date: 'April 5, 2026',
    author: 'John Smith',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'How to Care for Premium Denim',
    excerpt: 'Keep your jeans looking fresh and extend their lifespan with these expert care tips and tricks.',
    date: 'March 28, 2026',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blog' | 'shop' | 'login' | 'track-order' | 'cart' | 'wishlist' | 'contact' | 'campaigns' | 'shipping' | 'returns' | 'faq' | 'terms' | 'admin-dashboard' | 'user-dashboard'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#333333]">
      
      {/* Kanad Shop Style Header */}
      {currentPage !== 'admin-dashboard' && (
      <header className="bg-white shadow-sm relative z-50">
        {/* Top Bar */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 py-2 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-[#2563eb] transition-colors"><Phone size={12} /> +1 234 567 890</a>
              <a href="mailto:support@kanadshop.com" className="flex items-center gap-1 hover:text-[#2563eb] transition-colors"><Mail size={12} /> support@kanadshop.com</a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentPage('admin-dashboard')} className="hover:text-[#2563eb] transition-colors font-semibold text-[#2563eb]">Admin Panel</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setCurrentPage('track-order')} className="hover:text-[#2563eb] transition-colors">Track Order</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setCurrentPage('login')} className="hover:text-[#2563eb] transition-colors">Login / Register</button>
            </div>
          </div>
        </div>

        {/* Middle Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap justify-between items-center gap-y-4 lg:gap-y-0">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight cursor-pointer order-1" onClick={() => setCurrentPage('home')}>
            Kanad <span className="text-[#2563eb]">Shop</span>
          </h1>

          {/* Search Bar */}
          <div className="flex flex-1 w-full lg:w-auto order-3 lg:order-2 max-w-2xl mx-0 lg:mx-8">
            <div className="flex w-full border border-gray-300 bg-gray-50 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:border-transparent transition-all shadow-sm">
              <select className="bg-transparent border-r border-gray-300 px-4 py-2 text-sm text-gray-600 focus:outline-none cursor-pointer">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setAppliedQuery(searchQuery);
                    setCurrentPage('shop');
                  }
                }}
              />
              <button 
                className="bg-[#2563eb] text-white px-6 py-2 hover:bg-[#1d4ed8] transition-colors"
                onClick={() => {
                  setAppliedQuery(searchQuery);
                  setCurrentPage('shop');
                }}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6 order-2 lg:order-3">
            <button onClick={() => setCurrentPage('user-dashboard')} className="text-gray-600 hover:text-[#2563eb] flex flex-col items-center gap-1">
              <User size={24} />
              <span className="text-[10px] uppercase font-semibold">Account</span>
            </button>
            <button onClick={() => setCurrentPage('wishlist')} className="text-gray-600 hover:text-[#2563eb] flex flex-col items-center gap-1 relative">
              <Heart size={24} />
              <span className="absolute -top-1 -right-2 bg-[#2563eb] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              <span className="text-[10px] uppercase font-semibold">Wishlist</span>
            </button>
            <button onClick={() => setCurrentPage('cart')} className="text-gray-600 hover:text-[#2563eb] flex flex-col items-center gap-1 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-2 bg-[#2563eb] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
              <span className="text-[10px] uppercase font-semibold">Cart</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            {/* Browse Categories */}
            <div className="group relative">
              <div className="bg-[#2563eb] text-white px-6 py-4 flex items-center gap-3 cursor-pointer hover:bg-[#1d4ed8] transition-colors w-64 rounded-t-xl">
                <Menu size={20} />
                <span className="font-semibold">Browse Categories</span>
                <ChevronDown size={16} className="ml-auto group-hover:rotate-180 transition-transform duration-200" />
              </div>

              {/* Vertical Mega Menu */}
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <ul className="py-2">
                  {/* Category Item with Sub-menu */}
                  <li className="group/item relative">
                    <a href="#" className="flex items-center justify-between px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400 group-hover/item:text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Electronics
                      </span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </a>
                    
                    {/* Sub-menu Pane */}
                    <div className="absolute top-0 left-full w-[600px] min-h-full bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 p-6 flex gap-8 ml-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#0f172a] border-b border-gray-100 pb-2 mb-4">Mobile & Accessories</h4>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Smartphones</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Phone Cases</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Power Banks</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Cables & Chargers</a></li>
                        </ul>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#0f172a] border-b border-gray-100 pb-2 mb-4">Computers</h4>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Laptops</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Desktops</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Monitors</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Computer Components</a></li>
                        </ul>
                      </div>
                      <div className="w-1/3 bg-gray-50 p-4 rounded text-center flex flex-col justify-center">
                        <span className="text-xs font-bold text-[#2563eb] uppercase mb-2">Up to 30% Off</span>
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200" alt="Promo" className="w-full h-24 object-cover rounded mb-2" />
                        <a href="#" className="text-sm font-bold text-[#0f172a] hover:underline">Shop Audio</a>
                      </div>
                    </div>
                  </li>

                  {/* Category Item with Sub-menu */}
                  <li className="group/item relative">
                    <a href="#" className="flex items-center justify-between px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400 group-hover/item:text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Fashion & Clothing
                      </span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </a>
                    
                    {/* Sub-menu Pane */}
                    <div className="absolute top-0 left-full w-[600px] min-h-full bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 p-6 flex gap-8 ml-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#0f172a] border-b border-gray-100 pb-2 mb-4">Men's Fashion</h4>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">T-Shirts & Polos</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Jeans & Pants</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Jackets & Coats</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Sneakers</a></li>
                        </ul>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#0f172a] border-b border-gray-100 pb-2 mb-4">Women's Fashion</h4>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Dresses</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Tops & Tees</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Activewear</a></li>
                          <li><a href="#" className="text-sm text-gray-500 hover:text-[#2563eb]">Heels & Flats</a></li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* Simple Category Items */}
                  <li>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Home & Kitchen
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Beauty & Personal Care
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                        Sports & Outdoors
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:text-[#2563eb] hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2 pt-4">
                      <span className="font-semibold">View All Categories</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Nav Links */}
            <nav className="flex-1 px-8 hidden md:flex space-x-8">
              <button onClick={() => setCurrentPage('home')} className={`font-semibold ${currentPage === 'home' ? 'text-[#2563eb]' : 'text-gray-700 hover:text-[#2563eb]'}`}>Home</button>
              <button onClick={() => { setCurrentPage('shop'); setAppliedQuery(''); setSearchQuery(''); }} className={`font-semibold ${currentPage === 'shop' ? 'text-[#2563eb]' : 'text-gray-700 hover:text-[#2563eb]'}`}>Shop</button>
              <button onClick={() => setCurrentPage('campaigns')} className={`font-semibold ${currentPage === 'campaigns' ? 'text-[#2563eb]' : 'text-gray-700 hover:text-[#2563eb]'}`}>Campaigns</button>
              <button onClick={() => setCurrentPage('blog')} className={`font-semibold ${currentPage === 'blog' ? 'text-[#2563eb]' : 'text-gray-700 hover:text-[#2563eb]'}`}>Blog</button>
              <button onClick={() => setCurrentPage('contact')} className={`font-semibold ${currentPage === 'contact' ? 'text-[#2563eb]' : 'text-gray-700 hover:text-[#2563eb]'}`}>Contact</button>
            </nav>

            {/* Right Promo */}
            <div className="hidden lg:block text-sm font-semibold text-[#0f172a]">
              Free Shipping on Orders $50+
            </div>
          </div>
        </div>
      </header>
      )}

      {/* Main Content Area */}
      {currentPage === 'home' && (
        <main className="pb-12">
          
          {/* Hero Section (Slider + Side Banners) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Main Slider */}
              <div className="lg:w-3/4 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group shadow-md">
                <div 
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {heroSlides.map((slide) => (
                    <div key={slide.id} className="min-w-full relative h-full bg-gray-100">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center p-10 md:p-16">
                        <div className="max-w-lg">
                          <p className="text-blue-400 font-bold uppercase tracking-widest mb-3 text-sm">{slide.subheading}</p>
                          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">{slide.title}</h2>
                          <button className="bg-[#2563eb] text-white px-8 py-3.5 font-semibold rounded-full hover:bg-[#1d4ed8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                            {slide.buttonLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#2563eb] hover:text-white">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#2563eb] hover:text-white">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Side Banners */}
              <div className="lg:w-1/4 flex flex-col gap-6">
                <div className="h-[190px] md:h-[238px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-md">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Promo 1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors"></div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/90 font-bold text-sm mb-1 uppercase tracking-wider">New Arrivals</p>
                    <h3 className="text-white font-extrabold text-2xl">Sport Shoes</h3>
                    <p className="text-blue-400 font-bold mt-2 group-hover:translate-x-2 transition-transform">Shop Now →</p>
                  </div>
                </div>
                <div className="h-[190px] md:h-[238px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-md">
                  <img src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Promo 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors"></div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/90 font-bold text-sm mb-1 uppercase tracking-wider">Clearance Sale</p>
                    <h3 className="text-white font-extrabold text-2xl">Smartphones</h3>
                    <p className="text-blue-400 font-bold mt-2 group-hover:translate-x-2 transition-transform">Shop Now →</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Features Bar */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <Truck size={36} className="text-[#2563eb]" />
                <div>
                  <h4 className="font-bold text-[#0f172a]">Free Shipping</h4>
                  <p className="text-xs text-gray-500">For all orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <Shield size={36} className="text-[#2563eb]" />
                <div>
                  <h4 className="font-bold text-[#0f172a]">Secure Payment</h4>
                  <p className="text-xs text-gray-500">100% secure payment</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <Clock size={36} className="text-[#2563eb]" />
                <div>
                  <h4 className="font-bold text-[#0f172a]">24/7 Support</h4>
                  <p className="text-xs text-gray-500">Dedicated support</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <CreditCard size={36} className="text-[#2563eb]" />
                <div>
                  <h4 className="font-bold text-[#0f172a]">Money Back</h4>
                  <p className="text-xs text-gray-500">If goods have problems</p>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Categories */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-bold text-[#0f172a]">Popular Categories</h2>
              <a href="#" className="text-[#2563eb] font-semibold text-sm hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-gray-50 p-2">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm group-hover:text-[#2563eb] transition-colors">{cat.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Flash Deals / Top Picks */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-bold text-[#0f172a]">Deals of the Week</h2>
              <a href="#" className="text-[#2563eb] font-semibold text-sm hover:underline">View All</a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group relative">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-[#2563eb] hover:bg-gray-50">
                      <Heart size={16} />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-[#2563eb] hover:bg-gray-50">
                      <Search size={16} />
                    </button>
                  </div>
                  <div className="aspect-square overflow-hidden bg-white p-4">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-50">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 hover:text-[#2563eb] cursor-pointer line-clamp-2 h-10">{product.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#2563eb] font-bold text-lg">{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-gray-400 text-sm line-through">{product.oldPrice}</span>
                      )}
                    </div>
                    <button className="w-full border border-[#2563eb] text-[#2563eb] font-semibold py-2 rounded-full hover:bg-[#2563eb] hover:text-white transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Promotional Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="bg-[#0f172a] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative shadow-xl">
              <div className="z-10 text-center md:text-left mb-6 md:mb-0">
                <p className="text-[#2563eb] font-bold uppercase tracking-wider mb-2">Special Offer</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Save up to 40% on Smart Home Devices</h2>
                <button className="bg-[#2563eb] text-white px-8 py-3 font-semibold rounded-full hover:bg-[#1d4ed8] transition-colors">
                  Shop Collection
                </button>
              </div>
              <div className="z-10 w-full md:w-1/3">
                <img src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=600" alt="Smart Home" className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" />
              </div>
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            </div>
          </section>

        </main>
      )}
      
      {currentPage === 'blog' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-10">Our Journal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                  <a href="#" className="text-[#2563eb] font-semibold uppercase text-sm tracking-wider hover:underline">
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'shop' && (
        <main className="bg-[#f8fafc] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <span className="cursor-pointer hover:text-[#2563eb]" onClick={() => setCurrentPage('home')}>Home</span>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-semibold">Shop</span>
              {appliedQuery && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-gray-900 font-semibold">Search: "{appliedQuery}"</span>
                </>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="w-full lg:w-1/4">
                {/* Categories Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
                  <h3 className="font-bold text-lg text-[#0f172a] mb-4 border-b border-gray-100 pb-2">Categories</h3>
                  <ul className="space-y-3">
                    {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys'].map((cat, i) => (
                      <li key={i}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]" /> 
                          <span className="text-gray-600 group-hover:text-[#2563eb] transition-colors">{cat}</span>
                          <span className="ml-auto text-xs text-gray-400">({Math.floor(Math.random() * 50) + 5})</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
                  <h3 className="font-bold text-lg text-[#0f172a] mb-4 border-b border-gray-100 pb-2">Price</h3>
                  <div className="space-y-4">
                    <input type="range" min="0" max="1000" className="w-full accent-[#2563eb]" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price: $0 - $1000</span>
                      <button className="text-xs font-bold text-[#2563eb] uppercase hover:underline">Filter</button>
                    </div>
                  </div>
                </div>

                {/* Brands Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
                  <h3 className="font-bold text-lg text-[#0f172a] mb-4 border-b border-gray-100 pb-2">Brands</h3>
                  <ul className="space-y-3">
                    {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'].map((brand, i) => (
                      <li key={i}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]" /> 
                          <span className="text-gray-600 group-hover:text-[#2563eb] transition-colors">{brand}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Promotional Banner in Sidebar */}
                <div className="rounded-lg overflow-hidden relative group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400" className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500" alt="Promo" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute top-6 left-6 right-6 text-center">
                    <p className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Super Sale</p>
                    <h3 className="text-white font-extrabold text-2xl mb-4">Up to 50% Off</h3>
                    <span className="inline-block bg-[#2563eb] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1d4ed8] transition-colors">Shop Now</span>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="w-full lg:w-3/4">
                {/* Toolbar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-[#2563eb]">
                      <Filter size={20} />
                      <span className="font-semibold">Filter</span>
                    </button>
                    <span className="text-sm text-gray-500">
                      {appliedQuery 
                        ? `Search results for "${appliedQuery}" (${products.filter(p => p.title.toLowerCase().includes(appliedQuery.toLowerCase())).length})` 
                        : `Showing 1–${products.length} of 50 results`}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#2563eb] cursor-pointer">
                        <option>Default Sorting</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Latest</option>
                        <option>Average Rating</option>
                      </select>
                    </div>
                    <div className="hidden sm:flex gap-2 border-l border-gray-200 pl-4">
                      <button className="p-1.5 bg-[#2563eb] text-white rounded"><Grid size={18} /></button>
                      <button className="p-1.5 bg-white text-gray-400 border border-gray-200 rounded hover:text-[#2563eb] hover:border-[#2563eb] transition-colors"><List size={18} /></button>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                {products.filter(p => p.title.toLowerCase().includes(appliedQuery.toLowerCase())).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.title.toLowerCase().includes(appliedQuery.toLowerCase())).map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col">
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded z-10">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-[#2563eb] hover:bg-gray-50">
                            <Heart size={16} />
                          </button>
                          <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-[#2563eb] hover:bg-gray-50">
                            <Search size={16} />
                          </button>
                        </div>
                        <div className="aspect-square overflow-hidden bg-white p-4">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-4 border-t border-gray-50 flex flex-col flex-grow">
                          <div className="flex text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                          </div>
                          <h3 className="text-sm font-medium text-gray-800 mb-2 hover:text-[#2563eb] cursor-pointer line-clamp-2 flex-grow">{product.title}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[#2563eb] font-bold text-lg">{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-gray-400 text-sm line-through">{product.oldPrice}</span>
                            )}
                          </div>
                          <button className="w-full border border-[#2563eb] text-[#2563eb] font-semibold py-2 rounded hover:bg-[#2563eb] hover:text-white transition-colors flex items-center justify-center gap-2 mt-auto">
                            <ShoppingCart size={16} /> Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">We couldn't find any products matching "{appliedQuery}".</p>
                    <button onClick={() => { setAppliedQuery(''); setSearchQuery(''); }} className="bg-[#0f172a] text-white px-8 py-3 rounded font-bold hover:bg-[#020617] transition-colors">Clear Search</button>
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-2">
                  <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-10 h-10 rounded bg-[#2563eb] text-white font-bold flex items-center justify-center">1</button>
                  <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors font-semibold">2</button>
                  <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors font-semibold">3</button>
                  <span className="text-gray-400 px-2">...</span>
                  <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors font-semibold">10</button>
                  <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'login' && (
        <main className="max-w-md mx-auto px-4 py-16 min-h-[60vh] flex flex-col justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-8">Login</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-[#2563eb] hover:underline">Forgot password?</a>
                </div>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
              </div>
              <button onClick={() => setCurrentPage('user-dashboard')} className="w-full bg-[#2563eb] text-white py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors">Sign In</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account? <a href="#" className="text-[#2563eb] font-semibold hover:underline">Register here</a>
            </p>
          </div>
        </main>
      )}

      {currentPage === 'track-order' && (
        <main className="max-w-md mx-auto px-4 py-16 min-h-[60vh] flex flex-col justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-2">Track Order</h2>
            <p className="text-center text-sm text-gray-500 mb-8">Enter your order details below to check the status.</p>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                <input type="text" placeholder="e.g. #123456789" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
                <input type="email" placeholder="Email used during checkout" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
              </div>
              <button className="w-full bg-[#0f172a] text-white py-3 rounded-full font-bold hover:bg-[#020617] transition-colors">Track Status</button>
            </form>
          </div>
        </main>
      )}

      {currentPage === 'cart' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Shopping Cart</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <img src={products[0].image} alt={products[0].title} className="w-16 h-16 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{products[0].title}</h3>
                    <p className="text-[#2563eb] font-bold">{products[0].price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button className="px-3 py-1 hover:bg-gray-50">-</button>
                    <span className="px-3 py-1 border-x border-gray-200">1</span>
                    <button className="px-3 py-1 hover:bg-gray-50">+</button>
                  </div>
                  <button className="text-gray-400 hover:text-red-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <img src={products[1].image} alt={products[1].title} className="w-16 h-16 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{products[1].title}</h3>
                    <p className="text-[#2563eb] font-bold">{products[1].price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button className="px-3 py-1 hover:bg-gray-50">-</button>
                    <span className="px-3 py-1 border-x border-gray-200">2</span>
                    <button className="px-3 py-1 hover:bg-gray-50">+</button>
                  </div>
                  <button className="text-gray-400 hover:text-red-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-[#0f172a] mb-4 border-b border-gray-100 pb-4">Cart Totals</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">$429.97</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#0f172a] border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span className="text-[#2563eb]">$429.97</span>
                  </div>
                </div>
                <button className="w-full bg-[#2563eb] text-white py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'wishlist' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">My Wishlist</h2>
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Browse our catalog and add items you love to your wishlist.</p>
            <button onClick={() => setCurrentPage('shop')} className="bg-[#0f172a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#020617] transition-colors">Continue Shopping</button>
          </div>
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8 text-center">Contact Us</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-[#0f172a] mb-4">Get in Touch</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-center gap-3"><Phone className="text-[#2563eb]" size={20} /> +1 234 567 890</p>
                  <p className="flex items-center gap-3"><Mail className="text-[#2563eb]" size={20} /> support@kanadshop.com</p>
                  <p className="flex items-center gap-3"><MapPin className="text-[#2563eb]" size={20} /> 123 Commerce St, NY 10001</p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb]"></textarea>
                </div>
                <button className="bg-[#2563eb] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors">Send Message</button>
              </form>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'campaigns' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8 text-center">Active Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl shadow-md overflow-hidden relative group cursor-pointer h-[300px]">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Campaign 1" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="text-[#2563eb] font-bold uppercase tracking-wider mb-2">Black Friday</p>
                <h3 className="text-white font-extrabold text-3xl mb-4">Up to 70% Off All Electronics</h3>
                <button onClick={() => setCurrentPage('shop')} className="bg-white text-[#0f172a] px-6 py-2 rounded-full font-bold hover:bg-[#2563eb] hover:text-white transition-colors">Shop Sale</button>
              </div>
            </div>
            <div className="rounded-2xl shadow-md overflow-hidden relative group cursor-pointer h-[300px]">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Campaign 2" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="text-[#2563eb] font-bold uppercase tracking-wider mb-2">Summer Clearance</p>
                <h3 className="text-white font-extrabold text-3xl mb-4">Buy 1 Get 1 Free on Fashion</h3>
                <button onClick={() => setCurrentPage('shop')} className="bg-white text-[#0f172a] px-6 py-2 rounded-full font-bold hover:bg-[#2563eb] hover:text-white transition-colors">Shop Sale</button>
              </div>
            </div>
            <div className="rounded-2xl shadow-md overflow-hidden relative group cursor-pointer h-[300px] md:col-span-2">
              <img src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Campaign 3" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="text-[#2563eb] font-bold uppercase tracking-wider mb-2">New User Exclusive</p>
                <h3 className="text-white font-extrabold text-4xl mb-4">Get $50 Off Your First Order</h3>
                <p className="text-gray-200 mb-6 max-w-lg">Sign up today and receive an exclusive discount code for your first purchase over $100.</p>
                <button onClick={() => setCurrentPage('login')} className="bg-[#2563eb] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors">Register Now</button>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'shipping' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Shipping Policy</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Processing Time</h3>
            <p className="mb-6 leading-relaxed">All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Rates & Delivery Estimates</h3>
            <p className="mb-6 leading-relaxed">Shipping charges for your order will be calculated and displayed at checkout. Standard delivery usually takes 3-5 business days. Expedited shipping options are available at an additional cost.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">International Shipping</h3>
            <p className="leading-relaxed">We currently ship to select international destinations. Customs, duties, and taxes are not included in the item price or shipping cost. These charges are the buyer's responsibility.</p>
          </div>
        </main>
      )}

      {currentPage === 'returns' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Returns & Exchanges</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Return Policy</h3>
            <p className="mb-6 leading-relaxed">We accept returns within 30 days of the original purchase date. Items must be unused, in their original packaging, and accompanied by a receipt or proof of purchase. Certain items, such as perishable goods or personalized products, are exempt from being returned.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Initiate a Return</h3>
            <p className="mb-6 leading-relaxed">To start a return, please contact our support team at support@kanadshop.com with your order number. We will provide you with a return shipping label and instructions on how and where to send your package.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Refunds</h3>
            <p className="leading-relaxed">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed to the original method of payment within 5-7 business days.</p>
          </div>
        </main>
      )}

      {currentPage === 'faq' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Frequently Asked Questions</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">How can I track my order?</h3>
              <p className="text-gray-600 leading-relaxed">You can track your order by clicking the "Track Order" link in the top navigation bar and entering your Order ID and billing email. You will also receive a tracking link via email once your order has shipped.</p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 leading-relaxed">We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.</p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600 leading-relaxed">Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location and will be calculated at checkout.</p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">How do I change or cancel my order?</h3>
              <p className="text-gray-600 leading-relaxed">Please contact our customer support team immediately if you need to change or cancel your order. Once an order has been processed and shipped, we are unable to make changes.</p>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'terms' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Terms of Service</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h3>
            <p className="mb-6 leading-relaxed">By accessing and using Kanad Shop, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Use License</h3>
            <p className="mb-6 leading-relaxed">Permission is granted to temporarily download one copy of the materials (information or software) on Kanad Shop's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Disclaimer</h3>
            <p className="mb-6 leading-relaxed">The materials on Kanad Shop's website are provided on an 'as is' basis. Kanad Shop makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Limitations</h3>
            <p className="leading-relaxed">In no event shall Kanad Shop or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Kanad Shop's website.</p>
          </div>
        </main>
      )}

      {currentPage === 'user-dashboard' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f172a]">John Doe</h3>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 bg-gray-50 text-[#2563eb] font-semibold rounded-lg">
                    <LayoutDashboard size={18} /> Overview
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#2563eb] rounded-lg transition-colors">
                    <ShoppingBag size={18} /> My Orders
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#2563eb] rounded-lg transition-colors">
                    <Heart size={18} /> Wishlist
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#2563eb] rounded-lg transition-colors">
                    <MapPin size={18} /> Addresses
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#2563eb] rounded-lg transition-colors">
                    <Settings size={18} /> Settings
                  </button>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button onClick={() => setCurrentPage('login')} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              <h2 className="text-2xl font-bold text-[#0f172a]">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#2563eb] rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <h4 className="text-2xl font-bold text-[#0f172a]">12</h4>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <Heart size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wishlist Items</p>
                    <h4 className="text-2xl font-bold text-[#0f172a]">5</h4>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <h4 className="text-2xl font-bold text-[#0f172a]">$849.50</h4>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-[#0f172a]">Recent Orders</h3>
                  <button className="text-sm text-[#2563eb] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Total</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-2026-001</td>
                        <td className="p-4 text-gray-600">Apr 10, 2026</td>
                        <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Delivered</span></td>
                        <td className="p-4 font-medium">$129.99</td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">View</button></td>
                      </tr>
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-2026-002</td>
                        <td className="p-4 text-gray-600">Apr 05, 2026</td>
                        <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Processing</span></td>
                        <td className="p-4 font-medium">$349.50</td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">View</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'admin-dashboard' && (
        <div className="flex min-h-screen bg-[#f8fafc]">
          {/* Admin Sidebar */}
          <aside className="w-64 bg-[#0f172a] text-white flex flex-col">
            <div className="p-6 flex items-center gap-3 border-b border-gray-800">
              <div className="w-8 h-8 bg-[#2563eb] rounded flex items-center justify-center font-bold">K</div>
              <span className="font-bold text-xl tracking-tight">Kanad Admin</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#2563eb] text-white rounded-lg font-medium">
                <ShoppingBag size={20} /> Orders
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Package size={20} /> Products
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Users size={20} /> Customers
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Activity size={20} /> Analytics
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={20} /> Settings
              </button>
            </nav>
            <div className="p-4 border-t border-gray-800">
              <button onClick={() => setCurrentPage('home')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <LogOut size={20} /> Exit to Store
              </button>
            </div>
          </aside>

          {/* Admin Main Content */}
          <main className="flex-1 flex flex-col">
            {/* Admin Header */}
            <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8">
              <h2 className="text-xl font-bold text-[#0f172a]">Overview</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#2563eb]" />
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  A
                </div>
              </div>
            </header>

            {/* Admin Content */}
            <div className="p-8 space-y-8 overflow-y-auto">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-[#0f172a]">$24,592.00</h3>
                    </div>
                    <div className="p-2 bg-blue-50 text-[#2563eb] rounded-lg"><DollarSign size={20} /></div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1"><Activity size={14} /> +12.5% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                      <h3 className="text-2xl font-bold text-[#0f172a]">845</h3>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShoppingBag size={20} /></div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1"><Activity size={14} /> +5.2% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Customers</p>
                      <h3 className="text-2xl font-bold text-[#0f172a]">1,204</h3>
                    </div>
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Users size={20} /></div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1"><Activity size={14} /> +18.1% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Active Products</p>
                      <h3 className="text-2xl font-bold text-[#0f172a]">142</h3>
                    </div>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Package size={20} /></div>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Activity size={14} /> +2 new this week</p>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-[#0f172a]">Recent Orders</h3>
                  <button className="text-sm text-[#2563eb] hover:underline font-medium">View All Orders</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Amount</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-1092</td>
                        <td className="p-4 text-gray-600">Sarah Jenkins</td>
                        <td className="p-4 text-gray-500">2 mins ago</td>
                        <td className="p-4 font-medium">$129.99</td>
                        <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Pending</span></td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">Manage</button></td>
                      </tr>
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-1091</td>
                        <td className="p-4 text-gray-600">Michael Chen</td>
                        <td className="p-4 text-gray-500">1 hour ago</td>
                        <td className="p-4 font-medium">$899.00</td>
                        <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Processing</span></td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">Manage</button></td>
                      </tr>
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-1090</td>
                        <td className="p-4 text-gray-600">Emily Davis</td>
                        <td className="p-4 text-gray-500">3 hours ago</td>
                        <td className="p-4 font-medium">$45.50</td>
                        <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Completed</span></td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">Manage</button></td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-[#0f172a]">#ORD-1089</td>
                        <td className="p-4 text-gray-600">David Wilson</td>
                        <td className="p-4 text-gray-500">Yesterday</td>
                        <td className="p-4 font-medium">$210.00</td>
                        <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Completed</span></td>
                        <td className="p-4"><button className="text-[#2563eb] hover:underline">Manage</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Footer */}
      {currentPage !== 'admin-dashboard' && (
      <footer className="bg-[#111111] text-white pt-16 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            
            {/* About Block */}
            <div>
              <h3 className="text-white text-2xl font-extrabold mb-5">Kanad <span className="text-[#2563eb]">Shop</span></h3>
              <p className="text-[#a3a3a3] leading-relaxed mb-6">
                Your ultimate multi-vendor marketplace. We provide the best products at the best prices with exceptional customer service.
              </p>
              <div className="flex gap-4">
                {/* Social Icons Mock */}
                <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#2563eb] cursor-pointer transition-colors">f</div>
                <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#2563eb] cursor-pointer transition-colors">t</div>
                <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#2563eb] cursor-pointer transition-colors">in</div>
              </div>
            </div>

            {/* Quick Links Block */}
            <div>
              <h3 className="text-white text-lg font-semibold uppercase tracking-wider mb-5">Quick links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">About Us</a></li>
                <li><a href="#" className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Track Order</a></li>
                <li><a href="#" className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Store Location</a></li>
              </ul>
            </div>

            {/* Customer Service Block */}
            <div>
              <h3 className="text-white text-lg font-semibold uppercase tracking-wider mb-5">Customer Service</h3>
              <ul className="space-y-3">
                <li><button onClick={() => setCurrentPage('shipping')} className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Shipping Policy</button></li>
                <li><button onClick={() => setCurrentPage('returns')} className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Returns & Exchanges</button></li>
                <li><button onClick={() => setCurrentPage('faq')} className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">FAQ</button></li>
                <li><button onClick={() => setCurrentPage('terms')} className="text-[#a3a3a3] hover:text-[#2563eb] transition-colors">Terms of Service</button></li>
              </ul>
            </div>

            {/* Newsletter Block */}
            <div>
              <h3 className="text-white text-lg font-semibold uppercase tracking-wider mb-5">Newsletter</h3>
              <p className="text-[#a3a3a3] mb-4">Subscribe to get 10% off your first order and exclusive updates.</p>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="px-4 py-3 bg-[#222222] border border-[#333333] text-white rounded-full focus:outline-none focus:border-[#2563eb]"
                  required
                />
                <button 
                  type="submit" 
                  className="px-5 py-3 bg-[#2563eb] text-white font-semibold rounded-full hover:bg-[#1d4ed8] transition-colors mt-2"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

          </div>

          <div className="border-t border-[#333333] py-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#777777] text-sm mb-4 md:mb-0">
              &copy; 2026 <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Kanad Shop</a>. All rights reserved.
            </p>
            <div className="flex gap-2">
              {/* Payment Icons Mock */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs text-black font-bold">VISA</div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs text-black font-bold">MC</div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs text-black font-bold">PP</div>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
