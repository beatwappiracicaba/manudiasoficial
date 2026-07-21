import { useState } from 'react';

export default function Upload({ label, onChange, accept = 'image/*', required, className = '' }) {
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange && onChange(file, url);
    }
  };

  const clear = () => {
    setPreview('');
    onChange && onChange(null, '');
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-gold/50 transition-colors relative overflow-hidden">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          required={required}
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-2xl">+</span>
            <span className="text-sm">Clique para enviar</span>
          </div>
        )}
      </label>
      {preview && (
        <button
          type="button"
          onClick={clear}
          className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Remover imagem
        </button>
      )}
    </div>
  );
}
