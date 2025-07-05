import React, { useState } from 'react'
import { useAddBookMutation } from '../redux/api/baseApi'
import toast from 'react-hot-toast'
import type { APIError } from '../type/book'

const CreateBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  })

  const [addBook, { isLoading }] = useAddBookMutation()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addBook(form).unwrap()
      toast.success('Book created successfully!')
      setForm({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        description: '',
        copies: 1,
        available: true,
      })
    } catch (error) {
      const err = error as APIError
      const errMessage =
        err?.data?.message || 'Failed to create book. Try again.'

      toast.error(errMessage)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Book</h1>
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
          min={1}
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Book'}
        </button>
      </form>
    </div>
  )
}

export default CreateBook
