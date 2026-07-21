import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const addEvent = () => setHidden(false)
    const removeEvent = () => setHidden(true)
    const mouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY })
    const mouseDown = () => setClicked(true)
    const mouseUp = () => setClicked(false)

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseenter', addEvent)
    document.addEventListener('mouseleave', removeEvent)
    document.addEventListener('mousedown', mouseDown)
    document.addEventListener('mouseup', mouseUp)

    return () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseenter', addEvent)
      document.removeEventListener('mouseleave', removeEvent)
      document.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [])

  if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[250] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: hidden ? 0 : clicked ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[249] border border-gold/30"
        style={{
          background: clicked
            ? 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)'
            : 'transparent',
          boxShadow: clicked ? '0 0 20px rgba(212,175,55,0.6)' : 'none',
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: hidden ? 0 : clicked ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  )
}
