import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  StickyNote, 
  Clock,
  MoreVertical,
  Edit2
} from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams.edit;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: notes, error: fetchError } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (fetchError) console.error("Notes Fetch Error:", fetchError);

  // Server Actions
  async function addNote(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('notes').insert({
        user_id: user.id,
        title,
        body
      });
      if (error) console.error("Add Note Error:", error);
      revalidatePath("/dashboard/notes");
    }
  }

  async function deleteNote(id: string) {
    "use server";
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('notes').delete().eq('id', id).eq('user_id', user.id);
      if (error) console.error("Delete Note Error:", error);
      revalidatePath("/dashboard/notes");
    }
  }

  async function updateNote(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (user && id) {
      const { error } = await supabase.from('notes').update({
        title,
        body,
        updated_at: new Date().toISOString()
      }).eq('id', id).eq('user_id', user.id);
      if (error) console.error("Update Note Error:", error);
      revalidatePath("/dashboard/notes");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-sm text-gray-500">Capture your thoughts and ideas instantly.</p>
        </div>
      </div>

      {/* Add Note Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <form action={addNote} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</label>
            <input 
              name="title" 
              required 
              placeholder="Note title..." 
              className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Body</label>
            <textarea 
              name="body" 
              rows={3}
              placeholder="Start writing..." 
              className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black transition-all flex items-center gap-2">
              <Plus size={18} /> Save Note
            </button>
          </div>
        </form>
      </div>

      {/* Notes Grid */}
      {!notes || notes.length === 0 ? (
        <div className="p-12 text-center text-gray-400 bg-white border border-gray-100 rounded-xl">
          <StickyNote size={40} className="mx-auto mb-4 opacity-20" />
          <p>{fetchError ? "Error loading notes." : "Your notebook is empty. Start writing!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes?.map((note) => (
            <div key={note.id} className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:border-gray-200 transition-all flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-900 leading-tight pr-4">{note.title}</h3>
                <div className="flex items-center gap-2">
                  <form action={deleteNote.bind(null, note.id)}>
                    <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
              {editId === note.id ? (
                <form action={updateNote} className="flex flex-col flex-1">
                  <input type="hidden" name="id" value={note.id} />
                  <input 
                    name="title" 
                    defaultValue={note.title} 
                    required 
                    className="w-full mb-2 px-2 py-1 text-sm font-bold bg-gray-50 border border-gray-200 rounded-md outline-none"
                  />
                  <textarea 
                    name="body" 
                    defaultValue={note.body} 
                    rows={4}
                    className="w-full flex-1 mb-4 px-2 py-1 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-auto">
                    <Link href="/dashboard/notes" className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">Cancel</Link>
                    <button type="submit" className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-black transition-colors">Save</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-sm text-gray-600 flex-1 whitespace-pre-wrap line-clamp-6 mb-6">
                    {note.body}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                       <Clock size={12} />
                       {new Date(note.created_at).toLocaleDateString()}
                    </div>
                    <Link href={`/dashboard/notes?edit=${note.id}`} className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 uppercase tracking-widest font-bold">
                      Edit <Edit2 size={10} />
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
