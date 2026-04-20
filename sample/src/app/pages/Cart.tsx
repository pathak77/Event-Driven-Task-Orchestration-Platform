import { useState } from 'react';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Momo', price: 150, quantity: 2, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=200' },
    { id: 2, name: 'Dal Bhat', price: 250, quantity: 1, image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?w=200' },
    { id: 3, name: 'Coffee', price: 100, quantity: 2, image: 'https://images.unsplash.com/photo-1774529239747-125d7a0bf928?w=200' },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.13); // 13% VAT in Nepal
  const total = subtotal + tax;

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
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>My Cart</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Cart Items */}
        {cartItems.map((item) => (
          <NeuCard key={item.id} padding="p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#333333' }}>
                    {item.name}
                  </h3>
                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 className="w-5 h-5" style={{ color: '#FF6F91' }} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold" style={{ color: '#FF8FA3' }}>
                    Rs {item.price}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: '#FDECEC',
                        boxShadow: '3px 3px 6px #e8d4d4, -3px -3px 6px #ffffff',
                        color: '#333333',
                      }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-6 text-center" style={{ color: '#333333' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
                        color: '#ffffff',
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </NeuCard>
        ))}

        {/* Price Summary */}
        <NeuCard>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p style={{ color: '#8A8A8A' }}>Subtotal</p>
              <p className="font-semibold" style={{ color: '#333333' }}>Rs {subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p style={{ color: '#8A8A8A' }}>VAT (13%)</p>
              <p className="font-semibold" style={{ color: '#333333' }}>Rs {tax}</p>
            </div>
            <div className="border-t pt-3" style={{ borderColor: '#e8d4d4' }}>
              <div className="flex justify-between">
                <p className="font-semibold text-lg" style={{ color: '#333333' }}>Total</p>
                <p className="font-semibold text-lg" style={{ color: '#FF8FA3' }}>Rs {total}</p>
              </div>
            </div>
          </div>
        </NeuCard>

        {/* Checkout Button */}
        <NeuButton onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </NeuButton>
      </div>
    </div>
  );
}
