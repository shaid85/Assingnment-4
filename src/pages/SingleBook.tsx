import { useParams } from 'react-router'
import { useGetBookByIdQuery } from '../redux/api/baseApi'

function SingleBook() {
  const { id } = useParams()
  const { data: book, isLoading, error } = useGetBookByIdQuery(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching books.</div>

  const b = book.data

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md mt-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{b.title}</h1>
      <p className="text-gray-600 mb-4 italic">by {b.author}</p>
      <p>
        <strong>Genre:</strong> {b.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {b.isbn}
      </p>
      <p>
        <strong>Copies:</strong> {b.copies}
      </p>
      <p>
        <strong>Available:</strong> {b.available ? 'Yes' : 'No'}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800">{b.description}</p>
      </div>

      <div className="text-sm text-gray-500">
        <p>
          <span className="font-semibold">Created At:</span>{' '}
          {new Date(b.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Updated At:</span>{' '}
          {new Date(b.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default SingleBook
