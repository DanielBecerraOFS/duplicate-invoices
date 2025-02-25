import './App.css'

import { DashboardLayout } from '@/modules/dashboard/router'
import { ThemeProvider } from '@/modules/core/router'
function App() {


  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DashboardLayout/>
    </ThemeProvider>
  )
}

export default App
