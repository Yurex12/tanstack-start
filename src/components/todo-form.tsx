import { db } from '#/db'
import { todos } from '#/db/schema'
import { redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useRef, type SubmitEvent } from 'react'
import z from 'zod'

const createTodoFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      name: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await db.insert(todos).values({ name: data.name })

    throw redirect({ to: '/' })
  })

export function TodoForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const createTodo = useServerFn(createTodoFn)

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const name = nameRef.current?.value
    if (!name) return

    await createTodo({ data: { name } })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
    </form>
  )
}
