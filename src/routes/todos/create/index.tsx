import { TodoForm } from '#/components/todo-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Create Todo</h1>

      <TodoForm />
    </div>
  )
}
