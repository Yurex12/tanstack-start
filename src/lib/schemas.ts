import z from 'zod'

export const filterSchema = z.object({
  filter: z.enum(['all', 'active', 'completed']).catch('all').optional(),
})

export const createTodoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export const getTodoSchema = z.object({
  id: z.uuid().min(1, 'Id is required'),
})

export const deleteTodoSchema = z.object({
  id: z.uuid().min(1, 'Id is required'),
})

export const updateTodoSchema = z.object({
  id: z.uuid().min(1, 'Id is required'),
  isComplete: z.boolean(),
})
