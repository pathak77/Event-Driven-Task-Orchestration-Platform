export function NeuInput({
  icon,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  rightIcon,
  onRightIconClick,
}) {
  return (
    <div 
      className="rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: '#E8F0FE',
        boxShadow: 'inset 4px 4px 8px #D1E1F9, inset -4px -4px 8px #ffffff',
      }}
    >
      <div style={{ color: '#9CA3AF' }}>{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex-1 bg-transparent outline-none placeholder:text-[#9CA3AF]"
        style={{ color: '#1F2937' }}
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="focus:outline-none"
          style={{ color: '#9CA3AF' }}
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}
