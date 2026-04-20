export function NeuCard({ children, className = '', padding = 'p-6' }) {
  return (
    <div 
      className={`rounded-3xl ${padding} ${className}`}
      style={{
        background: '#E8F0FE',
        boxShadow: '8px 8px 16px #D1E1F9, -8px -8px 16px #ffffff',
      }}
    >
      {children}
    </div>
  );
}
