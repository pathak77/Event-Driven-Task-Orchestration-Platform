import { useState } from 'react';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';

export function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    navigate('/order-history');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/order-history')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Feedback</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <NeuCard>
            <div className="text-center">
              <h3 className="font-semibold mb-4" style={{ color: '#333333' }}>
                How was your experience?
              </h3>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className="w-10 h-10"
                      fill={star <= (hoveredRating || rating) ? '#FFB84D' : 'none'}
                      style={{ 
                        color: star <= (hoveredRating || rating) ? '#FFB84D' : '#d8d6d3',
                        stroke: star <= (hoveredRating || rating) ? '#FFB84D' : '#d8d6d3',
                      }}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-3 font-medium" style={{ color: '#FF8FA3' }}>
                  {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                </p>
              )}
            </div>
          </NeuCard>

          {/* Comment */}
          <NeuCard>
            <h3 className="font-semibold mb-3" style={{ color: '#333333' }}>
              Tell us more
            </h3>
            <div 
              className="rounded-2xl p-4"
              style={{
                background: '#FDECEC',
                boxShadow: 'inset 4px 4px 8px #e8d4d4, inset -4px -4px 8px #ffffff',
              }}
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={6}
                className="w-full bg-transparent outline-none resize-none placeholder:text-[#B0A0A0]"
                style={{ color: '#333333' }}
              />
            </div>
          </NeuCard>

          {/* Submit Button */}
          <NeuButton type="submit" icon={<Send className="w-5 h-5" />}>
            Submit Feedback
          </NeuButton>
        </form>
      </div>
    </div>
  );
}