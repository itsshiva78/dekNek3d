import { Shield, Zap, Rocket, Layers, Globe, Code, Cpu, MousePointer2, Cloud, Share2, History, Smile } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Real-time Sync",
      desc: "Changes made by your team are reflected instantly across all devices. No more merge conflicts."
    },
    {
      icon: <Shield size={24} />,
      title: "Encrypted Storage",
      desc: "Military-grade encryption for all your 3D assets and intellectual property."
    },
    {
      icon: <Cpu size={24} />,
      title: "AI-Powered Meshing",
      desc: "Our proprietary AI models help you generate high-fidelity meshes from simple sketches."
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Rendering",
      desc: "Offload heavy render tasks to our distributed cloud cluster and save hours of time."
    },
    {
      icon: <Share2 size={24} />,
      title: "Easy Collaboration",
      desc: "Share your projects with a simple link. Reviewers can comment directly in 3D space."
    },
    {
      icon: <History size={24} />,
      title: "Version Control",
      desc: "Infinite undo and full version history for every asset in your library."
    }
  ];

  return (
    <div className="container py-20">
      <div style={{textAlign: 'center', marginBottom: '6rem'}}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '1.5rem'}}>Everything you need to <br/><span style={{color: 'var(--primary)'}}>Build Better 3D</span></h1>
        <p className="text-secondary" style={{fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto'}}>
          DekNek3D provides a comprehensive suite of tools designed specifically for modern 3D workflows.
        </p>
      </div>

      <div className="grid">
        {features.map((f, i) => (
          <div className="card" key={i}>
            <div className="card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p className="text-secondary">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="py-20 flex flex-col items-center gap-10">
        <h2 style={{fontSize: '2.5rem'}}>Integrate with your favorite tools</h2>
        <div className="flex gap-10 flex-wrap justify-center opacity-50">
          <div className="flex items-center gap-2 font-bold text-xl"><Code /> Blender</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Layers /> Unity</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Rocket /> Unreal</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Globe /> Three.js</div>
        </div>
      </div>

      <div className="card" style={{background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: 'white', textAlign: 'center', padding: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Ready to get started?</h2>
        <p className="mb-10" style={{opacity: 0.9}}>Join 10,000+ developers building the future of the web.</p>
        <Link href="/signup" className="btn" style={{background: 'white', color: 'var(--primary)'}}>
          Create Your Account
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return <Rocket size={size} />;
}
