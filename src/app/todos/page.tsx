import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TodosPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="container py-10">
      <div className="card">
        <h1 className="py-4">My Todos</h1>
        <ul className="flex flex-col gap-2">
          {todos && todos.length > 0 ? (
            todos.map((todo: any) => (
              <li key={todo.id} className="py-2 border-bottom">
                {todo.name}
              </li>
            ))
          ) : (
            <p className="text-secondary">No todos found. Create some in your Supabase dashboard!</p>
          )}
        </ul>
      </div>
    </div>
  )
}
