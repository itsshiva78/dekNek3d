import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  User, 
  Lock, 
  ShieldAlert,
  Save,
  Trash2
} from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Server Actions
  async function updateProfile(formData: FormData) {
    "use server";
    const fullName = formData.get("full_name") as string;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    await supabase.auth.updateUser({
      data: { full_name: fullName }
    });
    revalidatePath("/dashboard/settings");
  }

  return (
    <div className="space-y-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences and security.</p>
      </div>

      {/* Profile Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
           <User size={18} className="text-gray-400" />
           <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Profile</h2>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
           <form action={updateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                <input 
                  name="full_name" 
                  defaultValue={user.user_metadata?.full_name || ""}
                  placeholder="e.g. John Doe" 
                  className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input 
                  disabled
                  value={user.email}
                  className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md text-gray-400 cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 italic">Email cannot be changed currently.</p>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-black transition-all flex items-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              </div>
           </form>
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
           <Lock size={18} className="text-gray-400" />
           <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Security</h2>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
           <form className="space-y-4 opacity-50 pointer-events-none">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
                <input 
                  type="password"
                  placeholder="••••••••" 
                  className="w-full px-4 py-2 text-sm bg-gray-50 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button disabled className="px-6 py-2 bg-gray-100 text-gray-400 rounded-md text-sm font-semibold flex items-center gap-2">
                  Update Password
                </button>
              </div>
           </form>
           <p className="text-[10px] text-gray-400 text-center mt-4">Password reset is available via the login page forgot password flow.</p>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-2 pb-2 border-b border-red-100">
           <ShieldAlert size={18} className="text-red-400" />
           <h2 className="text-sm font-bold uppercase tracking-widest text-red-600">Danger Zone</h2>
        </div>
        <div className="bg-red-50/30 border border-red-100 rounded-xl p-6">
           <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-red-900">Delete Account</h3>
                <p className="text-xs text-red-700/70 mt-1 max-w-sm">
                  Permanently remove your account and all associated data. This action is irreversible.
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-sm">
                <Trash2 size={14} /> Delete
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
