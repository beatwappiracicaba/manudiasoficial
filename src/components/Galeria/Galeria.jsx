import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaSearchPlus, FaSearchMinus } from 'react-icons/fa'
import Reveal from '../Reveal/Reveal'

// Load initial images from assets for backward compatibility
const loadInitialImages = () => {
  // This is a fallback for when no images are saved yet
  // In a real app, you might want to keep some default images
  return []
}

export default function Galeria() {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('galleryImages')
    return saved ? JSON.parse(saved) : loadInitialImages()
  })
  
  const [filtered, setFiltered] = useState([])
  const [filter, setFilter] = useState('Todas')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const touchStartRef = useRef({ x: 0, y: 0 })

  // Update filtered images when filter or images change
  useEffect(() => {
    if (filter === 'Todas') {
      setFiltered(images)
    } else if (filter === 'Shows') {
      setFiltered(images.filter(img => img.category === 'show'))
    } else if (filter === 'Ensaio') {
      setFiltered(images.filter(img => img.category === 'rehearsal'))
    } else if (filter === 'Fãs') {
      setFiltered(images.filter(img => img.category === 'fan'))
    } else {
      setFiltered(images)
    }
  }, [filter, images])

  useEffect(() => {
    // Save to localStorage whenever images change
    localStorage.setItem('galleryImages', JSON.stringify(images))
  }, [images])

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setIsFullscreen(false)
    setZoom(1)
    document.body.style.overflow = 'unset'
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length)
  }, [filtered.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartRef.current.x
    const diffY = e.changedTouches[0].clientY - touchStartRef.current.y
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) prevImage()
      else nextImage()
    }
  }

  return (
    <section id="galeria" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Galeria de <span className="text-gold-gradient">Fotos</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <Reveal>
          <div className="flex justify-center gap-4 mb-12">
            {[ 
              { label: 'Todas', value: 'Todas' },
              { label: 'Shows', value: 'Shows' },
              { label: 'Ensaio', value: 'Ensaio' },
              { label: 'Fãs', value: 'Fãs' }
            ].map((f) => (
              <button
                key={f.label}
                onClick={() => setFilter(f.label)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f.label
                    ? 'bg-gradient-to-r from-yellow-600 to-gold text-dark'
                    : 'glass text-gray-300 hover:text-white hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((image, index) => (
            <motion.div
              key={image.url || index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={image.url}
                alt={`Galeria ${index + 1} - ${image.category}`}
                loading="lazy"
                className="w-full h-full object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white text-sm font-medium">Ampliar</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl hover:text-gold transition-colors z-10"
              aria-label="Fechar"
            >
              <FaTimes />
            </button>

            {filtered.length > 0 && (
              <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center">
                <motion.img
                  src={filtered[currentIndex].url}
                  alt=""
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                  style={{ scale: zoom }}
                  animate={{ scale: zoom }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />

                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage() }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
                      aria-label="Anterior"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage() }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
                      aria-label="Próxima"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 3)) }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
                    aria-label="Zoom in"
                  >
                    <FaSearchPlus />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.5, 1)) }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
                    aria-label="Zoom out"
                  >
                    <FaSearchMinus />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFullscreen((f) => !f) }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
