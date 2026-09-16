import { db } from '#/db'
import { todos } from '#/db/schema'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import z from 'zod'

const getTodoFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, data.id),
    })

    if (todo == null) throw notFound()

    return todo
  })

export const Route = createFileRoute('/contact/$id/')({
  component: RouteComponent,
  loader: ({ params }) => getTodoFn({ data: params }),
})

function RouteComponent() {
  const todo = Route.useLoaderData()
  return <div>Hello "/contact/{todo.name}!</div>
}
