export interface Book {
  author: string
  available: boolean
  copies: number
  description: string
  genre: string
  isbn: string
  title: string
  _id: string
  createdAt: string // ISO timestamp as string
  updatedAt: string
}

export interface BorrowBook {
  book: string
  quantity: number
  dueDate: Date
}

export type APIError = {
  status: number
  data?: {
    message?: string
    success?: boolean
    [key: string]: any
  }
}

export type BorrowedBook = {
  book: {
    title: string
    isbn: string
  }
  totalQuantity: number
  lastBorrowedAt?: string
}
