import { formatDate } from '#/lib/format'
import type { Todo } from '#/lib/types'
import { deleteTodoFn, updateTodoFn } from '#/server/todos'
import { Link, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from './ui/button'

export function Todo(todo: Todo) {
  const deleteTodo = useServerFn(deleteTodoFn)
  const updateTodo = useServerFn(updateTodoFn)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      await deleteTodo({ data: { id: todo.id } })
      await router.invalidate()
    })
  }

  function handleUpdate() {
    startTransition(async () => {
      await updateTodo({ data: { id: todo.id, isComplete: !todo.isComplete } })
      await router.invalidate()
    })
  }

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition ${
        isPending ? 'opacity-40 pointer-events-none' : 'hover:border-primary/40'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.isComplete}
          onChange={handleUpdate}
          disabled={isPending}
          className="size-4.5 cursor-pointer rounded border-input text-primary accent-primary transition"
        />
        <Link
          to="/todos/$id"
          params={{ id: todo.id }}
          className={`text-sm font-medium transition truncate hover:underline hover:text-primary ${
            todo.isComplete
              ? 'text-muted-foreground line-through'
              : 'text-foreground'
          }`}
        >
          {todo.name}
        </Link>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium shrink-0 ${
            todo.isComplete
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          }`}
        >
          {todo.isComplete ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <time
          className="text-xs text-muted-foreground"
          dateTime={new Date(todo.createdAt).toISOString()}
        >
          {formatDate(todo.createdAt)}
        </time>
        <Button
          variant="destructive"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}
          className="size-8 cursor-pointer"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}
