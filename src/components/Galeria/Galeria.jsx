import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const images = import.meta.glob('/src/assets/img/*.{jpeg,jpg,png,webp}', { eager: true })

function getImageUrls() {
  return Object.values(images).map((mod) => mod.default)
}

export default function Galeria() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    const urls = getImageUrls()
    setImageUrls(urls)
  }, [])

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
  }, [imageUrls.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }, [imageUrls.length])

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

  return (
    <section id="galeria" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Galeria de <span className="text-gold-gradient">Fotos</span>
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={src}
                alt={`Galeria ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Ampliar</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl hover:text-gold transition-colors z-10"
              aria-label="Fechar"
            >
              <FaTimes />
            </button>

            {imageUrls.length > 0 && (
              <div className="relative max-w-5xl max-h-[90vh] flex items-center justify-center">
                <img
                  src={imageUrls[currentIndex]}
                  alt={`Galeria ${currentIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                />

                {imageUrls.length > 1 && (
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
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}