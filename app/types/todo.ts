export interface Todo {
  id: number
  documentId: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
}

export interface TodosResponse {
  data: Todo[]
  meta: {
    pagination?: {
      page?: number
      pageSize?: number
      pageCount?: number
      total?: number
      start?: number
      limit?: number
    }
  }
}

export interface CreateTodoData {
  title: string
  description?: string
  completed?: boolean
}

export interface UpdateTodoData {
  title?: string
  description?: string
  completed?: boolean
}
