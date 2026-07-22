import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlus, FaChartBar, FaUsers, FaCamera, FaEdit, FaTimes, FaImage, FaClipboardList, FaCloudUploadAlt, FaRedo, FaBars } from 'react-icons/fa'

// Image upload modal component
const ImageUploadModal = ({ onClose, onImageAdded }) => {
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [category, setCategory] = useState('show')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setRotation(0) // Reset rotation when new image is selected
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsProcessing(true)
    
    // Convert image to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Image = e.target.result
      // Add to gallery with selected category
      onImageAdded({
        url: base64Image,
        category: category
      })
      
      // Reset form
      setImagePreview(null)
      setSelectedFile(null)
      setRotation(0)
      setCategory('show')
      setIsProcessing(false)
      onClose()
    }
    reader.readAsDataURL(selectedFile)
  }

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
        
        <h2 className="text-2xl font-bold text-center mb-6">Adicionar Nova Foto</h2>
        
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
                <p className="text-sm text-gray-400">Formatos suportados: JPG, PNG, WebP</p>
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
                <hassistant
Let me complete the response.


Now I'm now.
I'll justifiesubinput>
                <input
                  type="radio"
                  name="category"
                  value="show"
                  checked={category === 'show'}
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
                  checked={category === 'fan'}
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
                  checked={category === 'rehearsal'}
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
            {isProcessing ? 'Adicionando...' : 'Adicionar à Galeria'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('galleryImages')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    // Check if user is logged in (by checking for a token in localStorage)
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirect to login if not logged in
      navigate('/login')
    }
  }, [navigate])

  const handleImageAdded = (newImage) => {
    setImages(prev => [...prev, newImage])
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header with Hamburger Menu */}
      <header className="border-b border-gray-800 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
            >
              <FaBars />
            </button>
            <h1 className="text-3xl font-bold text-gold">Painel de Controle</h1>
          </div>
          <p className="text-gray-400 mt-2">Gerencie o conteúdo da sua galeria</p>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-dark/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-lg font-bold text-gold text-center">Menu</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowMobileMenu(false)
                    // In a real app, this would navigate to different sections
                    alert("Navigation to Gallery Section")
                  }}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaImage className="text-gold-400" />
                  <span>Galeria</span>
                </button>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaPlus className="text-gold-400" />
                  <span>Adicionar Foto</span>
                </button>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white flex items-center space-x-3"
                >
                  <FaChartBar className="text-gold-400" />
                  <span>Estatísticas</span>
                </button>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full text-center px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 text-white"
              >
                <FaTimes className="text-red-400 mr-2" />
                Fechar Menu
              </div>
            </div>
          )}
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
                  {images.filter(img => img.category === 'show').length}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Fotos de Fãs</h3>
                <p className="text-2xl font-bold text-white">
                  {images.filter(img => img.category === 'fan').length}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Fotos de Ensaio</h3>
                <p className="text-2xl font-bold text-white">
                  {images.filter(img => img.category === 'rehearsal').length}
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
                .slice(-12) // Show last 12 images
                .reverse()
                .map((image, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={image.url}
                      alt={`Foto ${image.category}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-2 py-1">
                      {image.category === 'show' && 'Show'}
                      {image.category === 'fan' && 'Fã'}
                      {image.category === 'rehearsal' && 'Ensaio'}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onImageAdded={handleImageAdded}
        />
      )}
    </div>
  )
}
