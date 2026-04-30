import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Filter,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const statusFilter = resolvedSearchParams.status || 'all';
  
  let query = supabase.from('tasks').select('*').order('created_at', { ascending: false });
  
  if (statusFilter === 'pending') query = query.eq('completed', false);
  if (statusFilter === 'completed') query = query.eq('completed', true);

  const { data: tasks, error: fetchError } = await query;
  if (fetchError) console.error("Tasks Fetch Error:", fetchError);

  // Server Actions
  async function addTask(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const priority = formData.get("priority") as string;
    const dueDate = formData.get("due_date") as string;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('tasks').insert({
        user_id: user.id,
        title,
        priority,
        due_date: dueDate || null
      });
      if (error) console.error("Add Task Error:", error);
      revalidatePath("/dashboard/tasks");
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    "use server";
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('tasks').update({ completed: !completed }).eq('id', id).eq('user_id', user.id);
      if (error) console.error("Toggle Task Error:", error);
      revalidatePath("/dashboard/tasks");
    }
  }

  async function deleteTask(id: string) {
    "use server";
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('tasks').delete().eq('id', id).eq('user_id', user.id);
      if (error) console.error("Delete Task Error:", error);
      revalidatePath("/dashboard/tasks");
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-100';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500">Organize and track your daily objectives.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tasks?status=all" className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>All</Link>
          <Link href="/dashboard/tasks?status=pending" className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === 'pending' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Pending</Link>
          <Link href="/dashboard/tasks?status=completed" className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === 'completed' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Completed</Link>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <form action={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task Title</label>
            <input 
              name="title" 
              required 
              placeholder="e.g. Design homepage hero section" 
              className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</label>
            <select name="priority" className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all cursor-pointer">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" className="w-full h-10 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Add Task
          </button>
        </form>
      </div>

      {/* Task List Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {!tasks || tasks.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <CheckCircle2 size={40} className="mx-auto mb-4 opacity-20" />
            <p>{fetchError ? "Error loading tasks." : "No tasks found. Relax or create one!"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-12">Done</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Task</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tasks?.map((task) => (
                  <tr key={task.id} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <form action={toggleTask.bind(null, task.id, task.completed)}>
                        <button type="submit" className={`transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}>
                          {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={14} />
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteTask.bind(null, task.id)}>
                        <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
