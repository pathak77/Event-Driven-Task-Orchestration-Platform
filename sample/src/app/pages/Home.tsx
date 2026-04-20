import { useState } from 'react';
import { Search, User, ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = ['All', 'Nepali Food', 'Fast Food', 'Drinks', 'Desserts'];

const foodItems = [
  { id: 1, name: 'Momo', price: 150, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400' },
  { id: 2, name: 'Dal Bhat', price: 250, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?w=400' },
  { id: 3, name: 'Chowmein', price: 120, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1769690507359-98ad7820b1bb?w=400' },
  { id: 4, name: 'Sel Roti', price: 80, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
  { id: 5, name: 'Coffee', price: 100, category: 'Drinks', image: 'https://images.unsplash.com/photo-1774529239747-125d7a0bf928?w=400' },
  { id: 6, name: 'Coke', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1636403724733-0fa0f7acb324?w=400' },
  { id: 7, name: 'Samosa', price: 30, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1627670381055-487000952cb0?w=400' },
  { id: 8, name: 'Burger', price: 180, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=400' },
];

export function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p style={{ color: '#8A8A8A' }}>Namaste,</p>
            <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Guest User</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: '#FDECEC',
                boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
              }}
            >
              <ShoppingCart className="w-5 h-5" style={{ color: '#FF8FA3' }} />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: '#FDECEC',
                boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
              }}
            >
              <User className="w-5 h-5" style={{ color: '#FF8FA3' }} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className="rounded-2xl px-4 py-3 flex items-center gap-3 mb-6"
          style={{
            background: '#FDECEC',
            boxShadow: 'inset 4px 4px 8px #e8d4d4, inset -4px -4px 8px #ffffff',
          }}
        >
          <Search className="w-5 h-5" style={{ color: '#B0A0A0' }} />
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-[#B0A0A0]"
            style={{ color: '#333333' }}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all"
              style={
                selectedCategory === cat
                  ? {
                      background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
                      color: '#ffffff',
                      boxShadow: '4px 4px 8px #e8d4d4, -4px -4px 8px #ffffff',
                    }
                  : {
                      background: '#FDECEC',
                      color: '#8A8A8A',
                      boxShadow: '4px 4px 8px #e8d4d4, -4px -4px 8px #ffffff',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items */}
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => navigate(`/food-detail/${item.id}`)}>
              <NeuCard padding="p-4">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: '#333333' }}>
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="font-semibold" style={{ color: '#FF8FA3' }}>
                    Rs {item.price}
                  </p>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
                      color: '#ffffff',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/cart');
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </NeuCard>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{ background: '#FDECEC' }}
      >
        <div 
          className="rounded-3xl p-4 flex justify-around"
          style={{
            background: '#FDECEC',
            boxShadow: '8px 8px 16px #e8d4d4, -8px -8px 16px #ffffff',
          }}
        >
          <button onClick={() => navigate('/home')} style={{ color: '#FF8FA3', fontWeight: '600' }}>Home</button>
          <button onClick={() => navigate('/menu')} style={{ color: '#8A8A8A' }}>Menu</button>
          <button onClick={() => navigate('/table-reservation')} style={{ color: '#8A8A8A' }}>Tables</button>
          <button onClick={() => navigate('/order-history')} style={{ color: '#8A8A8A' }}>Orders</button>
        </div>
      </div>
    </div>
  );
}
