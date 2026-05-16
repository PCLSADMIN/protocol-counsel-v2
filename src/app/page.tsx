import Link from "next/link";

export default function Home() {
  const systems = [
    {
      title: "Contract Intelligence",
      description: "Structure systems that reduce operational exposure before disputes emerge.",
    },
    {
      title: "Regulatory Continuity",
      description: "Compliance infrastructure designed for sustained operational resilience.",
    },
    {
      title: "Compliance Infrastructure",
      description: "Automated monitoring systems that eliminate regulatory blind spots.",
    },
    {
      title: "Corporate Governance",
      description: "Operational frameworks engineered for institutional accountability.",
    },
    {
      title: "Licensing Operations",
      description: "End-to-end lifecycle management for regulated business requirements.",
    },
    {
      title: "Risk Containment",
      description: "Predictive systems that identify and neutralize exposure vectors.",
    },
  ];

  const industries = [
    "Fintech", "Healthcare", "AI Companies", "Government Contractors",
    "Logistics", "SaaS", "Manufacturing", "Regulated Platforms"
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fafafa' }}>
      
      {/* HEADER */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              color: '#fafafa'
            }}>
              PROTOCOL
            </span>
            <span style={{
              fontSize: '15px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              COUNSEL
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '48px' }}>
            {['Systems', 'Industries', 'Infrastructure', 'About'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`}
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em'
                }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link 
            href="/portal/login"
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#fafafa',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              padding: '12px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '2px'
            }}
          >
            CLIENT PORTAL
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '160px 48px 120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(250, 250, 250, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        
        {/* Content */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '32px',
            textTransform: 'uppercase'
          }}>
            Legal Infrastructure
          </p>
          
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: '700',
            lineHeight: '0.95',
            letterSpacing: '-0.02em',
            color: '#fafafa',
            marginBottom: '48px',
            maxWidth: '900px'
          }}>
            For Regulated<br />Business.
          </h1>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '64px',
            maxWidth: '480px'
          }}>
            {['Contract Systems.', 'Compliance Intelligence.', 'Operational Governance.'].map((item, i) => (
              <p key={i} style={{
                fontSize: '18px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.01em'
              }}>
                {item}
              </p>
            ))}
          </div>

          <p style={{
            fontSize: '15px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.35)',
            lineHeight: '1.7',
            maxWidth: '400px',
            marginBottom: '56px'
          }}>
            Built for firms, operators, and companies<br />
            where failure is expensive.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link 
              href="/demo"
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#0a0a0a',
                backgroundColor: '#fafafa',
                textDecoration: 'none',
                padding: '16px 32px',
                letterSpacing: '0.05em'
              }}
            >
              Request Access
            </Link>
            <Link 
              href="/systems"
              style={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                padding: '16px 32px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              Explore Systems
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.3)'
          }}>
            SCROLL
          </span>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)'
          }} />
        </div>
      </section>

      {/* SYSTEMS */}
      <section style={{
        padding: '160px 48px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.3)',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            Operational Systems
          </p>
          
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            color: '#fafafa',
            lineHeight: '1.1',
            maxWidth: '700px',
            marginBottom: '80px'
          }}>
            Infrastructure for sustained operational resilience.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)'
          }}>
            {systems.map((system, i) => (
              <div key={i} style={{
                backgroundColor: '#0a0a0a',
                padding: '48px',
                transition: 'background-color 0.4s ease'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#fafafa',
                  marginBottom: '16px',
                  letterSpacing: '-0.01em'
                }}>
                  {system.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  lineHeight: '1.7'
                }}>
                  {system.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section style={{
        padding: '160px 48px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '120px',
          alignItems: 'center'
        }}>
          <div>
            <p style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.25em',
              color: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '24px',
              textTransform: 'uppercase'
            }}>
              Positioning
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '700',
              color: '#fafafa',
              lineHeight: '1.2',
              marginBottom: '32px'
            }}>
              We structure systems that reduce operational exposure.
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              Not reactive dispute resolution. Proactive system architecture.
            </p>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: '1.8'
            }}>
              Before disputes emerge. Before compliance gaps materialize. Before exposure becomes liability.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {[
              { label: 'Traditional', text: '"We practice law."' },
              { label: 'ProtocolCounsel', text: '"We engineer legal-operational systems."' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: i === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
              }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  color: i === 1 ? '#fafafa' : 'rgba(255, 255, 255, 0.3)',
                  marginBottom: '12px',
                  textTransform: 'uppercase'
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: '18px',
                  fontWeight: i === 1 ? '500' : '400',
                  color: i === 1 ? '#fafafa' : 'rgba(255, 255, 255, 0.5)',
                  fontStyle: i === 0 ? 'italic' : 'normal'
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{
        padding: '160px 48px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.3)',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            Industries
          </p>
          
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            color: '#fafafa',
            lineHeight: '1.1',
            maxWidth: '600px',
            marginBottom: '80px'
          }}>
            Regulated sectors. Complex requirements. Institutional solutions.
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {industries.map((industry, i) => (
              <div key={i} style={{
                padding: '16px 28px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.02em'
              }}>
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TYPE */}
      <section style={{
        padding: '160px 48px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.25em', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '24px', textTransform: 'uppercase' }}>Client Profile</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: '#fafafa', lineHeight: '1.2', maxWidth: '800px', margin: '0 auto 48px' }}>Operators. Founders. Regulated industries. Enterprise clients scaling compliance risk.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.35)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>Fewer clients. Larger contracts. Longer retention. Higher trust.</p>
        </div>
      </section>
      <section style={{ padding: '200px 48px', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '700', color: '#fafafa', lineHeight: '1.1', marginBottom: '32px' }}>Already trusted.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '56px', lineHeight: '1.8' }}>No screaming. No overselling. Just institutional-grade infrastructure.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/demo" style={{ fontSize: '13px', fontWeight: '600', color: '#0a0a0a', backgroundColor: '#fafafa', textDecoration: 'none', padding: '18px 40px', letterSpacing: '0.05em' }}>Request Access</Link>
            <Link href="/contact" style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', padding: '18px 40px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>Contact</Link>
          </div>
        </div>
      </section>
      <footer style={{ padding: '80px 48px 48px', backgroundColor: '#050505', borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '80px', marginBottom: '80px' }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.15em', color: '#fafafa' }}>PROTOCOL COUNSEL</span>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.3)', lineHeight: '1.7', maxWidth: '280px', marginTop: '24px' }}>Legal operations infrastructure for regulated business.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '20px', textTransform: 'uppercase' }}>Systems</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Contract Intelligence', 'Compliance', 'Governance', 'Risk'].map((item, i) => <li key={i} style={{ marginBottom: '12px' }}><Link href="/systems" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{item}</Link></li>)}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '20px', textTransform: 'uppercase' }}>Company</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['About', 'Industries', 'Contact'].map((item, i) => <li key={i} style={{ marginBottom: '12px' }}><Link href={`/${item.toLowerCase()}`} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{item}</Link></li>)}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '20px', textTransform: 'uppercase' }}>Legal</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Privacy', 'Terms', 'Security'].map((item, i) => <li key={i} style={{ marginBottom: '12px' }}><Link href={`/${item.toLowerCase()}`} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{item}</Link></li>)}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.25)' }}>© 2024 Protocol Counsel</p>
          <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.15)' }}>Technology infrastructure. Licensed providers deliver legal services.</p>
        </div>
      </footer>
    </main>
  );
}
