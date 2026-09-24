import { Todos } from '#/components/todos'
import { Button } from '#/components/ui/button'
import { filterSchema } from '#/lib/schemas'
import { getTodosFn } from '#/server/todos'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

const tabs = [
  { label: 'All', value: 'all' as const },
  { label: 'Active', value: 'active' as const },
  { label: 'Completed', value: 'completed' as const },
]


export const Route = createFileRoute('/')({
  component: Home,
  loaderDeps: ({ search }) => ({ filter: search.filter }),
  loader: ({ deps }) => getTodosFn({ data: deps }),
  validateSearch: filterSchema,
  pendingComponent: () => <div>Loading data</div>,
  errorComponent: () => <p>Something went wrong</p>,
})

function Home() {
  const todos = Route.useLoaderData()
  const router = useRouter()
  const { filter = 'all' } = Route.useSearch()
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

      <div className="flex gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            to="/"
            search={{ filter: tab.value }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filter === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Todos todos={todos} />
    </div>
  )
}
