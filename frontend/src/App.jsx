import { useEffect } from 'react'
import { initLenis } from './main'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import BackToTop from './components/BackToTop/BackToTop'
import CustomCursor from './components/CustomCursor/CustomCursor'
import FloatingButtons from './components/FloatingButtons/FloatingButtons'
import AppRoutes from './routes/AppRoutes'

function App() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <BackToTop />
      <CustomCursor />
      <FloatingButtons />
      <AppRoutes />
    </>
  )
}

export default App
