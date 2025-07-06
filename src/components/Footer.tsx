import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-20">
      <div className="container-footer mx-auto flex justify-between items-center">
        {/* Left: Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} - Md Saidul</p>

        {/* Right: Menu */}
        <div className="space-x-4 text-sm">
          <Link to="/" className="hover:underline">
            All Books
          </Link>
          <Link to="/create-book" className="hover:underline">
            Add Book
          </Link>

          <Link to="/borrow-summary" className="hover:underline">
            Borrow summary
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
