import { formateDate } from '#/lib/format'
import type { Todo } from '#/lib/types'

export function Todo(todo: Todo) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-xs transition hover:border-primary/40">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            todo.isComplete
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          }`}
        >
          {todo.isComplete ? 'Completed' : 'Pending'}
        </span>
        <p
          className={`text-sm font-medium ${
            todo.isComplete ? 'text-muted-foreground line-through' : ''
          }`}
        >
          {todo.name}
        </p>
      </div>

      <time
        className="text-xs text-muted-foreground"
        dateTime={new Date(todo.createdAt).toISOString()}
      >
        {formateDate(todo.createdAt)}
      </time>
    </div>
  )
}
