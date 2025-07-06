import { useState } from 'react'
import { useGetItemsQuery } from '../redux/api/baseApi'
import type { Book } from '../type/book'
import bookpng from '../assets/book3.png'
import { Link } from 'react-router'

const sortOptions = [
  { label: 'Newest', sortBy: 'createdAt', sort: 'desc' },
  { label: 'Oldest', sortBy: 'createdAt', sort: 'asc' },
  { label: 'Recently Updated', sortBy: 'updatedAt', sort: 'desc' },
  { label: 'Title A-Z', sortBy: 'title', sort: 'asc' },
  { label: 'Title Z-A', sortBy: 'title', sort: 'desc' },
]

function Home() {
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [genreFilter, setGenreFilter] = useState('')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = sortOptions.find((opt) => opt.label === e.target.value)
    if (selected) setSortOption(selected)
  }

  const [offset, setOffset] = useState(0)
  const limit = 12
  const {
    data: books,
    isLoading,
    error,
  } = useGetItemsQuery({
    offset,
    limit,
    sortBy: sortOption.sortBy,
    sort: sortOption.sort,
    filter: genreFilter,
  })

  const total = books?.total ?? 0
  const totalPages = Math.ceil(total / limit)

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="loading">Error fetching books.</div>
  return (
    <div className="container">
      <h1 className="title text-center text-3xl mb-10 ">
        📚 Welcome to My Library Management System!
      </h1>
      <div className="flex justify-between items-center mb-10">
        <div className="md:text-xl font-medium ">
          {total == 1 ? 'Total book' : 'Total books'} : {total}
        </div>
        <div className="flex justify-end flex-wrap w-[70%] gap-2">
          <select
            id="genre_filter"
            onChange={(e) => {
              setGenreFilter(e.target.value)
              setOffset(0) // reset pagination
            }}
            className="border px-2 py-1 rounded"
            value={genreFilter}
          >
            <option value="">All Genres</option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="FANTASY">Fantasy</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
          </select>
          <select
            id="sort_filter"
            onChange={handleSortChange}
            className="border px-2 py-1 rounded"
            value={sortOption.label}
          >
            {sortOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {books?.data?.map((book: Book) => (
          <div className="card-box flex flex-col" key={book._id}>
            <div className="bookimg">
              <img
                className="w-16 mb-4"
                src={bookpng}
                alt="Modern building architecture"
              />
            </div>
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>Isbn:</strong> {book.isbn}
            </p>
            <p>
              <strong>Copies:</strong> {book.copies}
            </p>
            <p>
              <strong>Available:</strong>{' '}
              {book.available ? (
                'Yes'
              ) : (
                <span className="text-red-500">Unavailable</span>
              )}
            </p>
            <div className="edit flex flex-wrap gap-2 mt-5">
              <div className="flex gap-2">
                <Link
                  to={book._id}
                  className="bg-blue-600 text-white rounded hover:bg-blue-700 px-4 py-2"
                >
                  View
                </Link>
                <Link
                  to={`/edit-book/${book._id}`}
                  className="bg-green-600 text-white rounded hover:bg-green-700 px-4 py-2"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete-book/${book._id}`}
                  className="bg-red-600 text-white rounded hover:bg-red-700 px-4 py-2"
                >
                  Delete
                </Link>
              </div>
              {book.copies === 0 || !book.available ? (
                <button
                  disabled
                  className="bg-gray-400 text-white rounded px-4 py-2 cursor-not-allowed"
                  title="This book is currently unavailable"
                >
                  Borrow
                </button>
              ) : (
                <Link
                  to={`/borrow/${book._id}`}
                  className="bg-green-700 text-white rounded hover:bg-green-800 px-4 py-2"
                >
                  Borrow
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 my-20">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setOffset(index * limit)}
            style={{
              padding: '8px 12px',
              backgroundColor: offset === index * limit ? '#007bff' : '#f0f0f0',
              color: offset === index * limit ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
