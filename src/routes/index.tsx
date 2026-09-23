import { Todos } from '#/components/todos'
import { Button } from '#/components/ui/button'
import { db } from '#/db'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Plus } from 'lucide-react'

const getTodosFn = createServerFn({ method: 'GET' }).handler(() =>
  db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  }),
)

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getTodosFn(),
  pendingComponent: () => <div>Loading data</div>,
  errorComponent: () => <p>Something went wrong</p>,
})

function Home() {
  const todos = Route.useLoaderData()
  const router = useRouter()
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1>My Todos</h1>
        <Button
          onClick={() => router.navigate({ to: '/todos/create' })}
          className="cursor-pointer"
        >
          <Plus /> Add
        </Button>
      </div>

      <Todos todos={todos} />
    </div>
  )
}
