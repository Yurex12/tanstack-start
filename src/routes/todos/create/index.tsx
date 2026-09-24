import { TodoForm } from '#/components/todo-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/todos/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto max-w-md p-8 space-y-6">
      <div className="space-y-1">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="size-3.5" /> Back to todos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Todo</h1>
        <p className="text-sm text-muted-foreground">Add a new task to your list.</p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-xs">
        <TodoForm />
      </div>
    </div>
  )
}

