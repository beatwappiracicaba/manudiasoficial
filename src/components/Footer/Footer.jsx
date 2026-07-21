import { motion } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#musicas', label: 'Músicas' },
    { href: '#contato', label: 'Contato' },
  ]

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
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
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
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors duration-300"
              >
                <FaInstagram size={20} />
                <span>@manudiasoficial1</span>
              </a>
              <a
                href="https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors duration-300"
              >
                <FaWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Manu Dias. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}