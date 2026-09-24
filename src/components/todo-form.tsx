import { db } from '#/db'
import { todos } from '#/db/schema'
import { redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useRef, useTransition, type SubmitEvent } from 'react'
import z from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const createTodoFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      name: z.string().min(1, 'Name is required'),
    }),
  )
  .handler(async ({ data }) => {
    await db.insert(todos).values({ name: data.name })

    throw redirect({ to: '/' })
  })

export function TodoForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const createTodo = useServerFn(createTodoFn)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const name = nameRef.current?.value.trim()
    if (!name) return

    startTransition(async () => {
      await createTodo({ data: { name } })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Todo Name
        </label>
        <Input
          id="name"
          name="name"
          ref={nameRef}
          placeholder="e.g., Buy groceries, Read a chapter..."
          autoFocus
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer"
      >
        {isPending ? 'Saving...' : 'Add Todo'}
      </Button>
    </form>
  )
}
