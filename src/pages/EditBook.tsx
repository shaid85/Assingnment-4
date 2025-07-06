import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useGetBookByIdQuery, useEditBookMutation } from '../redux/api/baseApi'
import toast from 'react-hot-toast'
import type { APIError } from '../type/book'

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading: isFetching } = useGetBookByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  const [editBook, { isLoading }] = useEditBookMutation()

  const book = data?.data

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  })

  // Prefill form
  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      })
    }
  }, [book])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    if (name === 'copies') {
      const copiesNum = Number(value)

      setForm((prev) => ({
        ...prev,
        copies: copiesNum,
        available: copiesNum > 0, // ✅ Auto-update available
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox' && e.target instanceof HTMLInputElement
            ? e.target.checked
            : value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await editBook({ id, bookData: form }).unwrap()
      toast.success('Book updated successfully!')
      navigate('/')
    } catch (error) {
      const err = error as APIError
      toast.error(err?.data?.message || 'Failed to update book.')
    }
  }

  if (isFetching) return <div className="loading">Loading book data...</div>

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          className="w-full border p-2 rounded"
          value={form.author}
          onChange={handleChange}
          required
        />

        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="FANTASY">Fantasy</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
        </select>

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="w-full border p-2 rounded"
          value={form.isbn}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="copies"
          placeholder="Copies"
          className="w-full border p-2 rounded"
          value={form.copies}
          onChange={handleChange}
          min={0}
          required
        />

        {form.copies === 0 && (
          <p className="text-red-500 text-sm">
            Setting copies to 0 will make this book unavailable.
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  )
}

export default EditBook
