import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaSearch, FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSidebar } from './Layout'

export default function Navbar() {
  const location = useLocation()
  const { setIsCollapsed } = useSidebar()

  const pathSegments = location.pathname.split('/').filter(Boolean).slice(1)

  const formatLabel = segment => {
    const map = {
      dashboard: 'Dashboard',
      pagina: 'Página Inicial',
      inicial: '',
      hero: 'Hero',
      sobre: 'Sobre',
      historia: 'História',
      agenda: 'Agenda',
      galeria: 'Galeria',
      instagram: 'Instagram',
      musicas: 'Músicas',
      repertorio: 'Repertório',
      depoimentos: 'Depoimentos',
      parceiros: 'Parceiros',
      newsletter: 'Newsletter',
      contato: 'Contato',
      seo: 'SEO',
      configuracoes: 'Configurações',
      conta: 'Conta',
    }
    return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  const breadcrumbItems = pathSegments.map((segment, index) => ({
    label: formatLabel(segment),
    path: '/' + pathSegments.slice(0, index + 1).join('/'),
    isLast: index === pathSegments.length - 1,
  }))

  const pageTitle = breadcrumbItems.length > 0 ? breadcrumbItems[breadcrumbItems.length - 1].label : 'Dashboard'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-30 h-16 bg-dark/80 backdrop-blur-xl border-b border-dark-border"
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center gap-4 min-w-0">
          <span className="md:hidden flex-shrink-0">
            <button onClick={() => setIsCollapsed(prev => !prev)} className="flex items-center">
              <FaBars className="text-xl text-gray-300" />
            </button>
          </span>
          <div className="flex items-center gap-2 min-w-0">
            {breadcrumbItems.length > 1 && (
              <nav className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                {breadcrumbItems.slice(0, -1).map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    {idx > 0 && <span className="text-gray-600">/</span>}
                    <span className="hover:text-gray-300 transition-colors">{item.label}</span>
                  </span>
                ))}
                <span className="text-gray-600 mx-1">/</span>
              </nav>
            )}
            <h1 className="text-lg font-semibold text-white truncate">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden md:flex items-center relative">
            <FaSearch className="absolute left-3 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-9 pr-4 py-1.5 text-sm rounded-lg bg-white/5 border border-dark-border text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200 w-48 lg:w-64"
            />
          </div>

          <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200">
            <FaBell className="text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-dark-border">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <FaUser className="text-gold text-sm" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white leading-tight">Admin</p>
                <p className="text-xs text-gray-500 leading-tight">admin@manusite.com</p>
              </div>
            </div>
            <button
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors duration-200"
              title="Sair"
            >
              <FaSignOutAlt className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
