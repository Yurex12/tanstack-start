import type { Todo as TTodo } from '#/lib/types'
import { Todo } from './todo'

export function Todos({ todos }: { todos: TTodo[] }) {
  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p>No todos yet. Create your first task!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  )
}

