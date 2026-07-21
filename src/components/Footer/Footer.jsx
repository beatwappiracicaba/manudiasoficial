import { motion } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa'

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#momentos', label: 'Momentos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#musicas', label: 'Músicas' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-2">
              Manu <span className="text-gold">Dias</span>
            </h3>
            <p className="text-gold text-sm tracking-widest uppercase mb-6">
              A Princesinha do Modão
            </p>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Conhecida por levar a emoção do sertanejo a cada apresentação.
              Natural de Piracicaba, conquistando o Brasil com voz e carisma.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Links rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Redes sociais</h4>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/manudiasoficial1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors duration-300 group"
              >
                <FaInstagram size={20} className="group-hover:scale-110 transition-transform" />
                <span>@manudiasoficial1</span>
              </a>
              <a
                href="https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors duration-300 group"
              >
                <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Feito com <FaHeart className="text-gold text-xs" /> para Manu Dias
          </p>
          <p className="text-gray-500 text-sm">
            © {currentYear} Manu Dias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
