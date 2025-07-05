import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useBorrowBookByIdMutation } from '../redux/api/baseApi'
import toast from 'react-hot-toast'
import type { APIError } from '../type/book'

const getDueDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 14)
  return date.toISOString().split('T')[0]
}

const BorrowBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [borrowBook, { isLoading }] = useBorrowBookByIdMutation()

  const [form, setForm] = useState({
    book: '',
    quantity: 1,
    dueDate: getDueDate(),
  })

  useEffect(() => {
    if (id) {
      setForm((prev) => ({ ...prev, book: id }))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === 'quantity' ? Number(value) : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.book) {
      toast.error('Book ID is missing.')
      return
    }
    try {
      await borrowBook(form).unwrap() // ✅ send form directly
      toast.success('Book borrowed successfully!')
      navigate('/borrow-summary')
    } catch (error) {
      const err = error as APIError
      toast.error(err?.data?.message || 'Borrow failed.')
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Borrow Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book ID */}
        <div>
          <label className="block font-medium mb-1">Book ID</label>
          <input
            type="text"
            name="book"
            value={form.book}
            readOnly
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min={1}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Borrowing...' : 'Borrow Book'}
        </button>
      </form>
    </div>
  )
}

export default BorrowBook
