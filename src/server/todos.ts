import { db } from '#/db'
import { todos } from '#/db/schema'
import {
  createTodoSchema,
  deleteTodoSchema,
  filterSchema,
  getTodoSchema,
  updateTodoSchema,
} from '#/lib/schemas'
import { notFound, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const getTodosFn = createServerFn({ method: 'GET' })
  .validator(filterSchema)
  .handler(async ({ data }) => {
    const filter =
      data.filter === 'active'
        ? false
        : data.filter === 'completed'
          ? true
          : undefined

    return await db.query.todos.findMany({
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
      ...(filter !== undefined && {
        where: eq(todos.isComplete, filter),
      }),
    })
  })

export const getTodoFn = createServerFn({ method: 'GET' })
  .validator(getTodoSchema)
  .handler(async ({ data }) => {
    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, data.id),
    })

    if (!todo) throw notFound()
    return todo
  })

export const createTodoFn = createServerFn({ method: 'POST' })
  .validator(createTodoSchema)
  .handler(async ({ data }) => {
    await db.insert(todos).values({ name: data.name })
    throw redirect({ to: '/', search: { filter: 'all' } })
  })

export const updateTodoFn = createServerFn({ method: 'POST' })
  .validator(updateTodoSchema)
  .handler(async ({ data }) => {
    await db
      .update(todos)
      .set({ isComplete: data.isComplete })
      .where(eq(todos.id, data.id))
  })

export const deleteTodoFn = createServerFn({ method: 'POST' })
  .validator(deleteTodoSchema)
  .handler(async ({ data }) => {
    await db.delete(todos).where(eq(todos.id, data.id))
  })
