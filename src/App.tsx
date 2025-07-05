import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />

      <div className="container relative">
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
    </div>
  )
}

export default App
