import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const foodData: Record<string, any> = {
  '1': { id: 1, name: 'Momo', price: 150, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600', description: 'Delicious steamed dumplings filled with fresh vegetables or tender meat, served with spicy tomato chutney.' },
  '2': { id: 2, name: 'Dal Bhat', price: 250, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?w=600', description: 'Traditional Nepali meal featuring steamed rice, flavorful lentil soup, vegetable curry, and pickle.' },
  '3': { id: 3, name: 'Chowmein', price: 120, category: 'Nepali Food', image: 'https://images.unsplash.com/photo-1769690507359-98ad7820b1bb?w=600', description: 'Stir-fried noodles with fresh vegetables, soy sauce, and authentic Nepali spices.' },
  '4': { id: 4, name: 'Sel Roti', price: 80, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', description: 'Traditional Nepali sweet rice bread, crispy on outside and soft inside.' },
  '5': { id: 5, name: 'Coffee', price: 100, category: 'Drinks', image: 'https://images.unsplash.com/photo-1774529239747-125d7a0bf928?w=600', description: 'Freshly brewed hot coffee made from premium Nepali coffee beans.' },
  '6': { id: 6, name: 'Coke', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1636403724733-0fa0f7acb324?w=600', description: 'Chilled Coca Cola to refresh your meal.' },
  '7': { id: 7, name: 'Samosa', price: 30, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1627670381055-487000952cb0?w=600', description: 'Crispy golden fried pastry filled with spiced potatoes and peas.' },
  '8': { id: 8, name: 'Burger', price: 180, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?w=600', description: 'Juicy beef burger with cheese, lettuce, tomato, and special sauce.' },
};

export function FoodDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const food = foodData[id || '1'] || foodData['1'];

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: '#FDECEC',
            boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden" style={{ height: '300px' }}>
          <ImageWithFallback
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <NeuCard>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: '#333333' }}>
            {food.name}
          </h1>
          <p className="mb-4" style={{ color: '#8A8A8A' }}>
            {food.description}
          </p>
          <p className="text-3xl font-semibold" style={{ color: '#FF8FA3' }}>
            Rs {food.price}
          </p>
        </NeuCard>

        {/* Quantity */}
        <NeuCard>
          <div className="flex justify-between items-center">
            <p className="font-semibold" style={{ color: '#333333' }}>Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: '#FDECEC',
                  boxShadow: '4px 4px 8px #e8d4d4, -4px -4px 8px #ffffff',
                  color: '#333333',
                }}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold w-8 text-center" style={{ color: '#333333' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
                  color: '#ffffff',
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </NeuCard>

        {/* Add to Cart */}
        <NeuButton 
          onClick={() => navigate('/cart')}
          icon={<ShoppingCart className="w-5 h-5" />}
        >
          Add to Cart - Rs {food.price * quantity}
        </NeuButton>
      </div>
    </div>
  );
}
