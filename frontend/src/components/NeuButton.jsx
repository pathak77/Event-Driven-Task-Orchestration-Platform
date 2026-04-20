export function NeuButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  icon,
}) {
  const getStyle = () => {
    if (variant === 'primary') {
      return {
        background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)',
        boxShadow: '6px 6px 12px #D1E1F9, -6px -6px 12px #ffffff',
        color: '#ffffff',
      };
    }
    return {
      background: 'linear-gradient(135deg, #2D74DA 0%, #4A90E2 100%)',
      boxShadow: '6px 6px 12px #D1E1F9, -6px -6px 12px #ffffff',
      color: '#ffffff',
    };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} rounded-2xl py-4 px-6 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] font-semibold`}
      style={getStyle()}
    >
      {children}
      {icon && icon}
    </button>
  );
}
