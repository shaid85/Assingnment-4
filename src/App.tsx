import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />

      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  )
}

export default App
