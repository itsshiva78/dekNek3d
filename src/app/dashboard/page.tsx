import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch Stats
  const [tasksRes, notesRes] = await Promise.all([
    supabase.from('tasks').select('*', { count: 'exact' }),
    supabase.from('notes').select('*', { count: 'exact' })
  ]);

  const tasks = tasksRes.data || [];
  const notes = notesRes.data || [];
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const totalNotes = notes.length;

  // Recent Activity (last 5)
  const recentTasks = [...tasks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3);
  const recentNotes = [...notes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 2);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl shadow-gray-900/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {getTimeOfDay()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-gray-400">Here's what's happening with your projects today.</p>
          </div>
          {totalTasks > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[240px] border border-white/10">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-300">Daily Progress</span>
                <span className="text-white">{Math.round((completedTasks / totalTasks) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock size={14} /> Total Tasks
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center gap-2 text-green-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 size={14} /> Completed
          </div>
          <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <AlertCircle size={14} /> Pending
          </div>
          <p className="text-3xl font-bold text-gray-900">{pendingTasks}</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText size={14} /> Total Notes
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalNotes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/dashboard/tasks" className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {recentTasks.length === 0 && recentNotes.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                  <AlertCircle size={24} className="text-gray-300" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">It's quiet here</h3>
                <p className="text-xs text-gray-500 max-w-[200px]">Start by creating your first task or note to see activity.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <p className="text-[10px] text-gray-400">Task • Created {new Date(task.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {recentNotes.map((note) => (
                  <div key={note.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{note.title}</p>
                        <p className="text-[10px] text-gray-400">Note • Created {new Date(note.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions / Getting Started */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
             <Link href="/dashboard/tasks" className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between group hover:bg-black transition-all">
                <div className="flex items-center gap-3">
                   <Plus size={20} />
                   <span className="font-medium">Create new task</span>
                </div>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </Link>
             <Link href="/dashboard/notes" className="p-4 bg-white border border-gray-100 text-gray-900 rounded-xl flex items-center justify-between group hover:border-gray-300 transition-all">
                <div className="flex items-center gap-3">
                   <Plus size={20} className="text-gray-400" />
                   <span className="font-medium">Write a note</span>
                </div>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
