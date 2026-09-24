import { Todo } from '#/components/todo'
import { Button } from '#/components/ui/button'
import { formateDate } from '#/lib/format'
import { getTodoFn } from '#/server/todos'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Clock, Hash } from 'lucide-react'


export const Route = createFileRoute('/todos/$id/')({
  component: RouteComponent,
  loader: ({ params }) => getTodoFn({ data: { id: params.id } }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center space-y-4">
      <div className="rounded-xl border border-dashed p-8 space-y-3">
        <h2 className="text-lg font-semibold">Todo Not Found</h2>
        <p className="text-sm text-muted-foreground">
          This task does not exist or may have been deleted.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <ArrowLeft className="size-3.5" /> Back to todos
          </Link>
        </Button>
      </div>
    </div>
  ),
})

function RouteComponent() {
  const todo = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-xl p-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to todos
        </Link>
      </div>

      {/* Main Interactive Card */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Todo Details</h1>
        <Todo {...todo} />
      </div>

      {/* Metadata Card */}
      <div className="rounded-xl border bg-card/60 p-5 space-y-3 text-xs">
        <h2 className="font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">
          Metadata
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-3.5 text-primary" />
            <span>Created: <strong className="text-foreground">{formateDate(todo.createdAt)}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-primary" />
            <span>Updated: <strong className="text-foreground">{formateDate(todo.updatedAt)}</strong></span>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2 font-mono text-[11px] truncate">
            <Hash className="size-3.5 text-primary shrink-0" />
            <span className="truncate">ID: <code className="text-foreground">{todo.id}</code></span>
          </div>
        </div>
      </div>
    </div>
  )
}

