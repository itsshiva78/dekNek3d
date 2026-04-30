import { Check, Rocket, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Perfect for hobbyists and solo creators.",
      features: ["5GB Storage", "3 Projects", "Community Support", "Basic AI Tools"],
      icon: <Rocket />,
      color: "var(--secondary)"
    },
    {
      name: "Pro",
      price: "$29",
      desc: "For professional developers and small teams.",
      features: ["50GB Storage", "Unlimited Projects", "Priority Support", "Advanced AI Models", "Custom Domains"],
      icon: <Zap />,
      color: "var(--primary)",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Scale with confidence and dedicated support.",
      features: ["Unlimited Storage", "SSO/SAML Auth", "Dedicated Manager", "White-label Options", "API Rate Limiting"],
      icon: <Crown />,
      color: "var(--accent)"
    }
  ];

  return (
    <div className="container py-20">
      <div style={{textAlign: 'center', marginBottom: '6rem'}}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '1.5rem'}}>Simple, Transparent <br/><span style={{color: 'var(--primary)'}}>Pricing</span></h1>
        <p className="text-secondary" style={{fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto'}}>
          Choose the plan that's right for you. All plans include our core 3D management engine.
        </p>
      </div>

      <div className="grid">
        {tiers.map((t, i) => (
          <div className="card" key={i} style={{
            borderColor: t.popular ? 'var(--primary)' : 'var(--border)',
            borderWidth: t.popular ? '2px' : '1px',
            position: 'relative'
          }}>
            {t.popular && (
              <span style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>MOST POPULAR</span>
            )}
            <div style={{color: t.color, marginBottom: '1.5rem'}}>{t.icon}</div>
            <h2 style={{fontSize: '2rem'}}>{t.name}</h2>
            <div style={{fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0'}}>
              {t.price}<span style={{fontSize: '1rem', fontWeight: 500, color: 'var(--secondary)'}}>{t.price !== 'Custom' ? '/mo' : ''}</span>
            </div>
            <p className="text-secondary mb-6">{t.desc}</p>
            
            <div className="flex flex-col gap-3 mb-10">
              {t.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2" style={{fontSize: '0.95rem'}}>
                  <Check size={18} style={{color: 'var(--primary)'}} />
                  {f}
                </div>
              ))}
            </div>

            <Link href="/signup" className={`btn ${t.popular ? 'btn-primary' : 'btn-outline'}`} style={{width: '100%'}}>
              Get Started
            </Link>
          </div>
        ))}
      </div>

      <div className="py-20 text-center">
        <h3>Frequently Asked Questions</h3>
        <div className="grid" style={{textAlign: 'left', marginTop: '3rem'}}>
          <div>
            <h4 className="mb-2">Can I switch plans later?</h4>
            <p className="text-secondary">Yes, you can upgrade or downgrade your plan at any time from your dashboard settings.</p>
          </div>
          <div>
            <h4 className="mb-2">Is there a free trial?</h4>
            <p className="text-secondary">Our Starter plan is free forever. No credit card required to sign up.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
