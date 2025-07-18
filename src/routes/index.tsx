import { createBrowserRouter } from 'react-router'
import App from '../App'
import SingleBook from '../pages/SingleBook'
import Home from '../pages/Home'
import BorrowedBooksPage from '../pages/Borrow'
import CreateBook from '../pages/CreateBook'
import EditBook from '../pages/EditBook'
import BorrowBook from '../pages/BorrowBook'
import DeleteBook from '../pages/DeleteBook'
import PrivateRoute from '../components/PrivateRoute'
import Dashboard from '../pages/Dashboard'
import LoginForm from '../components/LoginForm'
import CheckOut from '../components/CheckOut'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/:id',
        // element: <App />,
        Component: SingleBook,
      },
      {
        path: '/create-book',
        // element: <App />,
        Component: CreateBook,
      },
      {
        path: '/edit-book/:id',
        // element: <App />,
        Component: EditBook,
      },
      {
        path: '/delete-book/:id',
        // element: <App />,
        Component: DeleteBook,
      },
      {
        path: '/borrow/:id',
        // element: <App />,
        Component: BorrowBook,
      },
      {
        path: '/borrow-summary',
        // element: <App />,
        Component: BorrowedBooksPage,
      },
      {
        path: '/dashboard',
        Component: () => (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/checkout',
        Component: () => (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        Component: () => <LoginForm />,
      },
    ],
  },
])

export default router
