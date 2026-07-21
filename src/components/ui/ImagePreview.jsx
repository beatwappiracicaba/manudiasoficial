export default function ImagePreview({ src, alt = 'Imagem', onRemove, className = '' }) {
  if (!src) return null;
  return (
    <div className={`relative inline-block ${className}`}>
      <img src={src} alt={alt} className="h-20 w-20 object-cover rounded-lg border border-white/10" />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-400 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
}
