import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <nav className="h-20 flex items-center justify-between px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">P</div>
          Productify
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Login</Link>
          <Link href="/signup" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-40 text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-500">
           <Sparkles size={14} className="text-amber-500" />
           The future of personal productivity is here
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1]">
          Organize your tasks. <br />
          <span className="text-gray-400">Capture your thoughts.</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The minimal, all-in-one workspace for your daily tasks and notes. 
          Built for builders who value simplicity and focus.
        </p>

        <div className="flex items-center justify-center gap-4">
           <Link href="/signup" className="px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-bold hover:bg-black transition-all flex items-center gap-2 group shadow-lg shadow-gray-200">
             Start building for free
             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {/* Hero Image / Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto group">
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl z-0 transition-all duration-1000 group-hover:blur-2xl" />
           <div className="relative aspect-video bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/5 p-4 z-10">
              <div className="w-full h-full bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-6 shadow-sm">
                 {/* Fake App Header */}
                 <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">P</div>
                       <div className="text-sm font-bold text-gray-900 tracking-tight">Productify Workspace</div>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">JD</div>
                    </div>
                 </div>
                 {/* Fake App Content */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-4">
                    <div className="col-span-2 flex flex-col gap-4">
                       <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Today's Tasks</div>
                       {/* Fake Tasks */}
                       <div className="p-4 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between group-hover:border-indigo-100 transition-colors">
                          <div className="flex items-center gap-3">
                             <CheckCircle2 size={18} className="text-indigo-500" />
                             <div className="text-sm font-medium text-gray-400 line-through">Review Q3 Marketing Strategy</div>
                          </div>
                          <div className="px-2 py-1 text-[10px] font-bold text-green-700 bg-green-50 rounded uppercase tracking-wider">Done</div>
                       </div>
                       <div className="p-4 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between group-hover:border-purple-100 transition-colors delay-100">
                          <div className="flex items-center gap-3">
                             <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                             <div className="text-sm font-medium text-gray-900">Finalize Landing Page Redesign</div>
                          </div>
                          <div className="px-2 py-1 text-[10px] font-bold text-amber-700 bg-amber-50 rounded uppercase tracking-wider">High</div>
                       </div>
                       <div className="p-4 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between group-hover:border-pink-100 transition-colors delay-200">
                          <div className="flex items-center gap-3">
                             <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                             <div className="text-sm font-medium text-gray-900">Sync with Engineering Team</div>
                          </div>
                          <div className="px-2 py-1 text-[10px] font-bold text-gray-600 bg-gray-100 rounded uppercase tracking-wider">Low</div>
                       </div>
                    </div>
                    {/* Fake Notes Sidebar */}
                    <div className="col-span-1 bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
                       <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Notes</div>
                       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="text-xs font-bold text-gray-900 mb-1">Product Ideas 💡</div>
                          <div className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">Need to implement real-time collaboration features by next month. Also focus on...</div>
                       </div>
                       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="text-xs font-bold text-gray-900 mb-1">Meeting Notes</div>
                          <div className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">Client feedback was overwhelmingly positive. They specifically loved the dark mode.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                 <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-900 shadow-sm">
                    <Zap size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
                 <p className="text-gray-500 leading-relaxed">Built with Next.js 15 and Supabase for instantaneous interactions and real-time updates.</p>
              </div>
              <div className="space-y-4">
                 <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-900 shadow-sm">
                    <Shield size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900">Secure by Default</h3>
                 <p className="text-gray-500 leading-relaxed">Your data is yours alone. Protected by Supabase Row Level Security and end-to-end encryption.</p>
              </div>
              <div className="space-y-4">
                 <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-900 shadow-sm">
                    <CheckCircle2 size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900">Minimalist Intent</h3>
                 <p className="text-gray-500 leading-relaxed">No bloat, no clutter. Just the essential tools you need to stay productive and focused.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white text-xs">P</div>
            Productify
          </div>
          <p className="text-sm text-gray-400">© 2026 Productify Inc. Built with love and minimal CSS.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900">Twitter</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900">GitHub</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
