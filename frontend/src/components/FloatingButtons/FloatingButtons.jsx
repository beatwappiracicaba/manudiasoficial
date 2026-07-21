import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaChevronUp } from 'react-icons/fa'

const items = [
  {
    href: 'https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    href: 'https://www.instagram.com/manudiasoficial1/',
    label: 'Instagram',
    icon: FaInstagram,
    color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400',
  },
]

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {items.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg shadow-black/30 transition-colors`}
          aria-label={item.label}
        >
          <item.icon size={22} />
        </motion.a>
      ))}
    </div>
  )
}
