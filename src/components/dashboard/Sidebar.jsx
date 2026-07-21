import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaUser,
  FaImages,
  FaMusic,
  FaCalendarAlt,
  FaInstagram,
  FaStar,
  FaEnvelope,
  FaCog,
  FaSearch,
  FaUserCog,
  FaBars,
  FaChevronDown,
  FaChevronLeft,
} from 'react-icons/fa'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: FaHome },
  {
    path: '/dashboard/pagina-inicial',
    label: 'Página Inicial',
    icon: FaHome,
    submenu: [
      { path: '/dashboard/pagina-inicial/hero', label: 'Hero', icon: FaStar },
      { path: '/dashboard/pagina-inicial/sobre', label: 'Sobre', icon: FaUser },
      { path: '/dashboard/pagina-inicial/historia', label: 'História', icon: FaCalendarAlt },
      { path: '/dashboard/pagina-inicial/agenda', label: 'Agenda', icon: FaCalendarAlt },
      { path: '/dashboard/pagina-inicial/galeria', label: 'Galeria', icon: FaImages },
      { path: '/dashboard/pagina-inicial/instagram', label: 'Instagram', icon: FaInstagram },
      { path: '/dashboard/pagina-inicial/musicas', label: 'Músicas', icon: FaMusic },
      { path: '/dashboard/pagina-inicial/repertorio', label: 'Repertório', icon: FaStar },
      { path: '/dashboard/pagina-inicial/depoimentos', label: 'Depoimentos', icon: FaStar },
      { path: '/dashboard/pagina-inicial/parceiros', label: 'Parceiros', icon: FaUser },
      { path: '/dashboard/pagina-inicial/newsletter', label: 'Newsletter', icon: FaEnvelope },
      { path: '/dashboard/pagina-inicial/contato', label: 'Contato', icon: FaEnvelope },
    ],
  },
  { path: '/dashboard/seo', label: 'SEO', icon: FaSearch },
  {
    path: '/dashboard/configuracoes',
    label: 'Configurações',
    icon: FaCog,
    submenu: [
      { path: '/dashboard/configuracoes/conta', label: 'Conta', icon: FaUserCog },
    ],
  },
]

function SubMenu({ items, isCollapsed, isOpen }) {
  if (isCollapsed) return null

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden pl-10 space-y-1"
        >
          {items.map(subItem => {
            const Icon = subItem.icon
            return (
              <li key={subItem.path}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-gold bg-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                  end
                >
                  <Icon className="text-xs flex-shrink-0" />
                  {subItem.label}
                </NavLink>
              </li>
            )
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export default function Sidebar({ isCollapsed, onToggle }) {
  const [openMenus, setOpenMenus] = useState({})

  const toggleMenu = path => {
    setOpenMenus(prev => ({ ...prev, [path]: !prev[path] }))
  }

  return (
    <div className="flex flex-col h-full max-w-[260px]">
      <div className="flex items-center justify-between px-4 py-5 border-b border-dark-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
            <FaStar className="text-gold text-lg" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold whitespace-nowrap text-white"
              >
                MANUSITE
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon
          if (item.submenu) {
            const isOpen = openMenus[item.path] ?? true
            return (
              <div key={item.path}>
                <button
                  onClick={() => toggleMenu(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 group"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon className="text-lg flex-shrink-0" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        {isOpen ? <FaChevronDown className="text-xs" /> : <FaChevronLeft className="text-xs" />}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <SubMenu items={item.submenu} isCollapsed={isCollapsed} isOpen={isOpen} />
              </div>
            )
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-gold bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="text-lg flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-dark-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isCollapsed ? <FaBars className="text-lg" /> : <FaChevronLeft className="text-lg" />}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap text-sm font-medium"
              >
                Recolher menu
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}
