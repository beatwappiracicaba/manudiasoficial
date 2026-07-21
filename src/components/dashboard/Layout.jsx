import { useState, createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export const SidebarContext = createContext()

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a Layout')
  return context
}

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex h-screen w-full overflow-hidden bg-dark font-sans text-white">
        <motion.aside
          variants={sidebarVariants}
          initial={false}
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full z-40 bg-dark border-r border-dark-border flex flex-col"
        >
          <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} />
        </motion.aside>

        <motion.div
          animate={{ marginLeft: isCollapsed ? 80 : 260 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex flex-col flex-1 h-full min-w-0"
        >
          <Navbar />
          <main className="flex-1 overflow-y-auto pt-16">
            <div className="p-4">
              <div className="mb-4 p-3 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs text-center">
                Modo demonstração — Backend em desenvolvimento
              </div>
            </div>
            <div className="px-4 pb-4">
              <Outlet />
            </div>
          </main>
        </motion.div>
      </div>
    </SidebarContext.Provider>
  )
}
