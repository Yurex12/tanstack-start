import { db } from '#/db'
import { todos } from '#/db/schema'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import z from 'zod'

const serverFn = createServerFn({ method: 'GET' }).handler(() => {
  return db.query.todos.findMany()
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => serverFn(),
})

export const addTodo = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      name: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await db.insert(todos).values({ ...data, isComplete: false })

    throw redirect({ to: '/contact/$id', params: { id: '10' } })
  })

function Home() {
  const data = Route.useLoaderData()

  const addTodoFn = useServerFn(addTodo)

  function handleAdd() {
    addTodoFn({ data: { name: 'Yusuf' } })
  }
  return (
    <div className="p-8">
      {data.map((data) => (
        <div key={data.id}>
          <h1>{data.name}</h1>
        </div>
      ))}
    </div>
  )
}
