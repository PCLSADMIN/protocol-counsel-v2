import Link from "next/link";

export default function Home() {
  const systems = [
    {
      title: "Medical Records Infrastructure",
      description: "HIPAA-compliant authorization routing with automated provider tracking.",
      metric: "99.9%",
      metricLabel: "Audit Success",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", // Dark tech/abstract
    },
    {
      title: "Vital Records Fulfillment",
      description: "Fast-track ordering for official state certificates required for active litigation.",
      metric: "48hr",
      metricLabel: "Average Turnaround",
      image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=800&auto=format&fit=crop", // Dark purple abstract
    },
    {
      title: "Asset Discovery & Recovery",
      description: "Intelligent retrieval with chain-of-custody documentation.",
      metric: "$500M+",
      metricLabel: "Assets Located",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop", // Dark architectural
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable compliance logging.",
      metric: "Zero",
      metricLabel: "Breaches",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", // Dark server/data
    },
  ];

  return (
    <main style={{ backgroundColor: '#050505', color: '#fafafa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'rgba(5, 5, 5, 0.6)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: '#fafafa', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#050505', fontWeight: '900', fontSize: '14px', letterSpacing: '-0.05em' }}>PC</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.2em', color: '#fafafa' }}>PROTOCOL COUNSEL</span>
          </Link>
          
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/systems" style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', color: '#a1a1aa', textDecoration: 'none', textTransform: 'uppercase' }}>Systems</Link>
            <Link href="/company" style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', color: '#a1a1aa', textDecoration: 'none', textTransform: 'uppercase' }}>Company</Link>
            <Link href="/portal/login" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', color: '#050505', backgroundColor: '#D4AF37', padding: '12px 24px', textDecoration: 'none', textTransform: 'uppercase' }}>Client Portal</Link>
          </div>
        </div>
      </header>

      {/* CINEMATIC HERO */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
          transform: 'scale(1.05)', // slight zoom for cinematic feel
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 40%, rgba(5,5,5,0.4) 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(0deg, rgba(5,5,5,1) 0%, transparent 20%)'
        }} />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto', padding: '0 48px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ height: '1px', width: '40px', backgroundColor: '#D4AF37' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase' }}>
              Legal Infrastructure
            </span>
          </div>
          
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(60px, 8vw, 110px)',
            fontWeight: '400',
            lineHeight: '0.9',
            color: '#fafafa',
            marginBottom: '40px',
            maxWidth: '1000px',
            letterSpacing: '-0.02em'
          }}>
            Chaos is expensive.<br />
            <span style={{ color: '#888' }}>Certainty is engineered.</span>
          </h1>
          
          <p style={{
            fontSize: '20px',
            fontWeight: '300',
            color: '#a1a1aa',
            lineHeight: '1.6',
            maxWidth: '560px',
            marginBottom: '56px',
            letterSpacing: '0.01em'
          }}>
            We don't practice law. We build the operational systems that regulated enterprises use to neutralize risk before it materializes.
          </p>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/demo" style={{
              display: 'inline-block',
              fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em',
              color: '#050505', backgroundColor: '#fafafa',
              padding: '20px 40px', textDecoration: 'none', textTransform: 'uppercase',
              transition: 'transform 0.3s ease'
            }}>
              Initiate Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* THE PROVOCATION (Thought-Provoking Statement) */}
      <section style={{ backgroundColor: '#fafafa', color: '#050505', padding: '160px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: '400',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '40px'
          }}>
            Don't hire a law firm<br />to do a system's job.
          </h2>
          <p style={{
            fontSize: '22px',
            color: '#52525b',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Traditional firms react to disputes. We architect the intelligence, compliance routing, and governance structures that prevent them from happening in the first place.
          </p>
        </div>
      </section>

      {/* BOLD METRICS */}
      <section style={{ padding: '120px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '64px' }}>
          {[
            { label: "Systems Deployed", value: "1,204" },
            { label: "Compliance Rate", value: "100%" },
            { label: "Documents Secured", value: "12M+" },
            { label: "Infrastructure Uptime", value: "99.99%" }
          ].map((stat, i) => (
            <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '32px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.2em', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '16px' }}>{stat.label}</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '64px', fontWeight: '400', color: '#D4AF37', lineHeight: '1' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE SYSTEMS (Cinematic Grid) */}
      <section style={{ padding: '160px 48px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ height: '1px', width: '40px', backgroundColor: '#D4AF37' }}></div>
                <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase' }}>Capabilities</span>
              </div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: '400', color: '#fafafa' }}>
                Operational Systems
              </h2>
            </div>
            <Link href="/systems" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', color: '#fafafa', textDecoration: 'none', borderBottom: '1px solid #D4AF37', paddingBottom: '8px', textTransform: 'uppercase' }}>
              View Architecture ↗
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '32px' }}>
            {systems.map((sys, i) => (
              <div key={i} style={{
                position: 'relative',
                height: '500px',
                backgroundColor: '#111',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '48px'
              }}>
                {/* Background Image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${sys.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: '0.4', transition: 'opacity 0.5s ease',
                  filter: 'grayscale(100%) contrast(120%)'
                }} />
                {/* Gradient Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.2) 60%, transparent 100%)' }} />
                
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: '400', color: '#fafafa', maxWidth: '300px', lineHeight: '1.1' }}>
                      {sys.title}
                    </h3>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '32px', fontWeight: '300', color: '#D4AF37', lineHeight: '1' }}>{sys.metric}</p>
                      <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', color: '#a1a1aa', textTransform: 'uppercase', marginTop: '8px' }}>{sys.metricLabel}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '15px', color: '#a1a1aa', maxWidth: '400px', lineHeight: '1.6' }}>
                    {sys.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '120px 48px 48px', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '64px', marginBottom: '120px' }}>
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#fafafa', marginBottom: '24px' }}>Protocol Counsel</h2>
              <p style={{ fontSize: '14px', color: '#a1a1aa', maxWidth: '300px', lineHeight: '1.6' }}>
                Engineering legal-operational systems for companies where failure is expensive.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '120px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', color: '#fafafa', textTransform: 'uppercase', marginBottom: '32px' }}>Infrastructure</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Link href="/systems" style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'none' }}>Operational Systems</Link>
                  <Link href="/security" style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'none' }}>Security & Vault</Link>
                  <Link href="/compliance" style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'none' }}>Compliance Matrix</Link>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', color: '#fafafa', textTransform: 'uppercase', marginBottom: '32px' }}>Entity</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Link href="/company" style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'none' }}>About</Link>
                  <Link href="/contact" style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'none' }}>Contact</Link>
                  <Link href="/portal/login" style={{ fontSize: '14px', color: '#D4AF37', textDecoration: 'none' }}>Client Portal</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
            <p style={{ fontSize: '12px', color: '#71717a' }}>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/privacy" style={{ fontSize: '12px', color: '#71717a', textDecoration: 'none' }}>Privacy</Link>
              <Link href="/terms" style={{ fontSize: '12px', color: '#71717a', textDecoration: 'none' }}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}