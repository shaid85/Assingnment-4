import { useParams, useNavigate } from 'react-router'
import { useDeleteBookByIdMutation } from '../redux/api/baseApi'
import toast from 'react-hot-toast'
import type { APIError } from '../type/book'

const DeleteBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deleteBook, { isLoading }] = useDeleteBookByIdMutation()

  const handleDelete = async () => {
    try {
      await deleteBook(id!).unwrap()
      toast.success('Book deleted successfully!')
      navigate('/') // or to /books
    } catch (error) {
      const err = error as APIError
      toast.error(err?.data?.message || 'Failed to delete book.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Are you sure you want to delete this book?
      </h1>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
