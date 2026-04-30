import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function checkTables() {
  const { data: tasks, error: tasksError } = await supabase.from('tasks').select('*').limit(1);
  const { data: notes, error: notesError } = await supabase.from('notes').select('*').limit(1);

  console.log("Tasks Table Check:", tasksError ? `ERROR: ${tasksError.message}` : "OK");
  console.log("Notes Table Check:", notesError ? `ERROR: ${notesError.message}` : "OK");
}

checkTables();
