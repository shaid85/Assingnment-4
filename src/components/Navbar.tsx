// components/Navbar.tsx

import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className="header bg-white shadow py-6">
      <div className="container-header m-0">
        <nav className="">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">
              <Link to="/">MyLogo</Link>
            </div>

            {/* Menu Items */}
            <div className="flex space-x-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-600 cursor-pointer">
                Home
              </Link>
              <Link
                to="/create-book"
                className="hover:text-blue-600 cursor-pointer"
              >
                Create book
              </Link>

              <Link
                to="/borrow-summary"
                className="hover:text-blue-600 cursor-pointer"
              >
                Borrow summary
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
