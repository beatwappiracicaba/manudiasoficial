import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaChartBar,
  FaUsers,
  FaCamera,
  FaEdit,
  FaTimes,
  FaImage,
  FaClipboardList,
  FaCloudUploadAlt,
  FaRedo,
  FaBars,
  FaCalendarAlt,
  FaHeading,
  FaAlignLeft,
} from "react-icons/fa";

// Image upload modal component (unchanged)
const ImageUploadModal = ({ onClose, onImageAdded }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [category, setCategory] = useState("show");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      onImageAdded({
        url: base64Image,
        category: category,
      });

      // Reset form
      setImagePreview(null);
      setSelectedFile(null);
      setRotation(0);
      setCategory("show");
      setIsProcessing(false);
      onClose();
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-dark/80 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Adicionar Nova Foto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
            {!imagePreview ? (
              <div className="space-y-4">
                <label className="cursor-pointer bg-gray-700/50 px-4 py-2 rounded-lg transition-colors hover:bg-gray-700">
                  <FaCloudUploadAlt /> Clique para selecionar ou arraste uma foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-sm text-gray-400">
                  Formatos suportados: JPG, PNG, WebP
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                <div className="absolute top-2 right-2 bg-gray-800/50 rounded-full p-2">
                  <button onClick={handleRotate} className="text-gray-300 hover:text-white">
                    <FaRedo />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Categoria
            </label>
            <div className="mt-1 space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="show"
                  checked={category === "show"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-radio text-gold-600"
                />
                <span>Shows</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="fan"
                  checked={category === "fan"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-radio text-gold-600"
                />
                <span>Fãs</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="rehearsal"
                  checked={category === "rehearsal"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-radio text-gold-600"
                />
                <span>Ensaio</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!imagePreview || isProcessing}
            className="w-full py-3 px-6 bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Adicionando..." : "Adicionar à Galeria"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Timeline manager modal component
const TimelineManagerModal = ({ onClose, onTimelineAdded }) => {
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("timelineItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Load items from localStorage on mount (in case changed elsewhere)
  useEffect(() => {
    const saved = localStorage.getItem("timelineItems");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year.trim() || !title.trim() || !description.trim()) return;

    setIsAdding(true);
    const newItem = {
      year: year.trim(),
      title: title.trim(),
      description: description.trim(),
    };
    onTimelineAdded(newItem);
    // Clear form
    setYear("");
    setTitle("");
    setDescription("");
    setIsAdding(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-dark/80 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Gerenciar Trajetória
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Ano
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 2024"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Primeiro show"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o evento..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isAdding}
              className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-sm rounded-lg hover:shadow-2xl hover:shadow-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adicionando..." : "Adicionar Evento"}
            </button>
            <button
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2 bg-gray-800/50 text-white font-sm rounded-lg hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Existing items list */}
        {items.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-300 mb-2">
              Eventos Existentes
            </h3>
            <div className="max-h-40 overflow-y-auto border border-gray-700 rounded-lg">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 border-t border-gray-700 last:border-t-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">{item.year}</span>
                    <span className="text-xs text-gray-400">#{idx + 1}</span>
                  </div>
                  <strong className="block text-white">{item.title}</strong>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("galleryImages");
    return saved ? JSON.parse(saved) : [];
  });
  const [timelineItems, setTimelineItems] = useState(() => {
    const saved = localStorage.getItem("timelineItems");
    return saved ? JSON.parse(saved) : [
      { year: "2018", title: "Primeiros Passos", description: "Início da trajetória musical em Piracicaba." },
      { year: "2019", title: "Primeiro show", description: "Apresentação marcante que conquistou o público local." },
      { year: "2020", title: "Reconhecimento", description: "Prêmios e reconhecimento regional." },
      { year: "2022", title: "A Princesinha do Modão", description: "Título consolidado e agenda crescente." },
      { year: "2024", title: "Nacional", description: "Expansão da carreira para novas cidades e estados." },
    ];
  });

  // Persist images to localStorage when changed
  useEffect(() => {
    localStorage.setItem("galleryImages", JSON.stringify(images));
  }, [images]);

  // Persist timeline items to localStorage when changed
  useEffect(() => {
    localStorage.setItem("timelineItems", JSON.stringify(timelineItems));
  }, [timelineItems]);

  // Load initial data from localStorage on mount (in case changed elsewhere)
  useEffect(() => {
    const savedImages = localStorage.getItem("galleryImages");
    if (savedImages) setImages(JSON.parse(savedImages));
    const savedTimeline = localStorage.getItem("timelineItems");
    if (savedTimeline) setTimelineItems(JSON.parse(savedTimeline));
  }, []);

  const handleImageAdded = (newImage) => {
    setImages((prev) => [...prev, newImage]);
  };

  const handleTimelineAdded = (newItem) => {
    setTimelineItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header with Hamburger Menu */}
      <header className="border-b border-gray-800 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTimelineModal(true)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
            >
              <FaCalendarAlt />
            </button>
            <h1 className="text-3xl font-bold text-gold">Painel de Controle</h1>
          </div>
          <p className="text-gray-400 mt-2">Gerencie o conteúdo da sua galeria e trajetória</p>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-dark/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-lg font-bold text-gold text-center">Menu</h3>
              <div className="space-y-2">
                {/* Trajetória button */}
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowTimelineModal(true);
                  }}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaCalendarAlt />
                  <span>Trajetória</span>
                </button>
                {/* Adicionar Foto button */}
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowUploadModal(true);
                  }}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaPlus />
                  <span>Adicionar Foto</span>
                </button>
                {/* Estatísticas button */}
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    // Placeholder for stats navigation
                    alert("Visualizar Estatísticas");
                  }}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaChartBar />
                  <span>Estatísticas</span>
                </button>
</div>
                <button onClick={() => setShowMobileMenu(false)} className="w-full text-center px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white"><FaTimes className="text-red-400 mr-2" />Fechar Menu</button>
                <button onClick={() => setShowMobileMenu(false)} className="w-full text-center px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white"><FaTimes className="text-red-400 mr-2" />Fechar Menu</button>
              </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Management Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gold mb-6">Gerenciamento de Galeria</h2>

          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Total de Fotos</h3>
                <p className="text-2xl font-bold text-white">{images.length}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Fotos de Show</h3>
                <p className="text-2xl font-bold text-white">
                  {images.filter((img) => img.category === "show").length}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Fotos de Fãs</h3>
                <p className="text-2xl font-bold text-white">
                  {images.filter((img) => img.category === "fan").length}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Fotos de Ensaio</h3>
                <p className="text-2xl font-bold text-white">
                  {images.filter((img) => img.category === "rehearsal").length}
                </p>
              </div>
            </div>

            {/* Add Photo Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-3 bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-lg px-6 py-3 rounded-lg hover:shadow-2xl hover:shadow-gold/20 transition-all"
              >
                <FaPlus />
                Adicionar Nova Foto
              </button>
            </div>
          </div>
        </section>

        {/* Recent Uploads Preview */}
        <section>
          <h2 className="text-2xl font-bold text-gold mb-6">Últimas Adições</h2>
          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma foto adicionada ainda.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .slice(-12)
                .reverse()
                .map((image, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={image.url}
                      alt={`Foto ${image.category}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-2 py-1">
                      {image.category === "show" && "Show"}
                      {image.category === "fan" && "Fã"}
                      {image.category === "rehearsal" && "Ensaio"}
<button onClick={() => setShowMobileMenu(false)} className="w-full text-center px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white"><FaTimes className="text-red-400 mr-2" />Fechar Menu</button>
               </div>
               <button onClick={() => setShowMobileMenu(false)} className="w-full text-center px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white"><FaTimes className="text-red-400 mr-2" />Fechar Menu</button>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onImageAdded={handleImageAdded}
        />
      )}

      {showTimelineModal && (
        <TimelineManagerModal
          onClose={() => setShowTimelineModal(false)}
          onTimelineAdded={handleTimelineAdded}
        />
      )}
    </div>
  );
}
