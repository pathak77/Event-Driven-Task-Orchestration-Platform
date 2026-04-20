import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = ['All', 'Nepali Food', 'Fast Food', 'Drinks', 'Desserts'];

const foodItems = [
  { id: 1, name: 'Momo', price: 150, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400', description: 'Steamed dumplings filled with vegetables or meat' },
  { id: 2, name: 'Dal Bhat', price: 250, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?w=400', description: 'Traditional Nepali meal with rice, lentils, and curry' },
  { id: 3, name: 'Chowmein', price: 120, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1769690507359-98ad7820b1bb?w=400', description: 'Stir-fried noodles with vegetables' },
  { id: 4, name: 'Sel Roti', price: 80, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', description: 'Traditional Nepali sweet rice bread' },
  { id: 5, name: 'Coffee', price: 100, category: 'Drinks', image: 'https://images.unsplash.com/photo-1774529239747-125d7a0bf928?w=400', description: 'Hot brewed coffee' },
  { id: 6, name: 'Coke', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1636403724733-0fa0f7acb324?w=400', description: 'Chilled Coca Cola' },
  { id: 7, name: 'Samosa', price: 30, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1627670381055-487000952cb0?w=400', description: 'Crispy fried pastry with spiced filling' },
  { id: 8, name: 'Burger', price: 180, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=400', description: 'Juicy beef burger with cheese' },
];

export function Menu() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = foodItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Menu</h1>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
      </div>

      {/* Menu Items List */}
      <div className="px-6 space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} onClick={() => navigate(`/food-detail/${item.id}`)}>
            <NeuCard padding="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: '#333333' }}>
                    {item.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#8A8A8A' }}>
                    {item.description}
                  </p>
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
                </div>
              </div>
            </NeuCard>
          </div>
        ))}
      </div>
    </div>
  );
}
