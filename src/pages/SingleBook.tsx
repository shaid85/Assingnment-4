import { Link, useParams } from 'react-router'
import { useGetBookByIdQuery } from '../redux/api/baseApi'

function SingleBook() {
  const { id } = useParams()
  const { data: book, isLoading, error } = useGetBookByIdQuery(id)

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="loading">Error fetching books.</div>

  const b = book.data

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-md mt-8 border border-gray-200">
        {/* Title and Author (no border) */}
        <h1 className="text-3xl font-bold text-blue-700 mb-1">{b.title}</h1>
        <p className="text-gray-600 mb-6 italic text-lg">by {b.author}</p>

        {/* Bordered Info Section */}
        <div className="space-y-4 border-t border-b py-4">
          <p className="text-gray-700">
            <strong>Genre:</strong> {b.genre}
          </p>
          <p className="text-gray-700">
            <strong>ISBN:</strong> {b.isbn}
          </p>
          <p className="text-gray-700">
            <strong>Copies:</strong> {b.copies}
          </p>
          <p className="text-gray-700">
            <strong>Available:</strong>{' '}
            {b.available ? (
              <span className="text-green-600 font-medium">Yes</span>
            ) : (
              <span className="text-red-500 font-medium">No</span>
            )}
          </p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Description
          </h2>
          <p className="text-gray-800 leading-relaxed">{b.description}</p>
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mt-6 border-t pt-4">
          <p>
            <span className="font-semibold">Created At:</span>{' '}
            {new Date(b.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{' '}
            {new Date(b.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="edit flex flex-wrap gap-2 mt-5">
          <div className="flex gap-2">
            <Link
              to="/"
              className="bg-blue-600 text-white rounded hover:bg-blue-700 px-4 py-2"
            >
              Back
            </Link>

            <Link
              to={`/delete-book/${book._id}`}
              className="bg-red-600 text-white rounded hover:bg-red-700 px-4 py-2"
            >
              Delete
            </Link>
          </div>
          <Link
            to={`/borrow/${b._id}`}
            className="bg-green-700 text-white rounded hover:bg-green-800 px-4 py-2"
          >
            Borrow
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleBook
