import { useGetBorrowedBooksQuery } from '../redux/api/baseApi'
import type { BorrowedBook } from '../type/book'

const BorrowedBooksPage = () => {
  const { data, error, isLoading } = useGetBorrowedBooksQuery(undefined)
  const borrowedList: BorrowedBook[] = data?.data || []

  if (isLoading) return <p>Loading borrowed books...</p>
  if (error) return <p>Error loading borrowed books.</p>

  function timeAgo(dateString: string) {
    const now = new Date()
    const past = new Date(dateString)
    const diffMs = now.getTime() - past.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day ago'
    return `${diffDays} days ago`
  }

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto md:p-10 p-6 mt-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Borrowed Books</h1>
        {borrowedList.length === 0 ? (
          <p>No borrowed books found.</p>
        ) : (
          <ul className="space-y-4">
            {borrowedList.map(
              ({ book, totalQuantity, lastBorrowedAt }, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center p-4 border rounded hover:shadow"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="text-gray-600">ISBN: {book.isbn}</p>
                    <div className="text-sm text-gray-500">
                      <p>Last borrowed: {timeAgo(lastBorrowedAt as string)}</p>
                    </div>
                  </div>
                  <div className="text-lg font-medium text-blue-600">
                    Quantity: {totalQuantity}
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BorrowedBooksPage
