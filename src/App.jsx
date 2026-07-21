import { useEffect } from 'react'
import { initLenis } from './main'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import BackToTop from './components/BackToTop/BackToTop'
import FloatingButtons from './components/FloatingButtons/FloatingButtons'
import AppRoutes from './routes/AppRoutes'
import { useDashboardStore } from './store/dashboardStore'

function App() {
  useEffect(() => {
    initLenis()
  }, [])

  useEffect(() => {
    useDashboardStore.getState().initialize()
  }, [])

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <BackToTop />
      <FloatingButtons />
      <AppRoutes />
    </>
  )
}

export default App
