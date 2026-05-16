import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Medical Records Retrieval",
      description: "HIPAA-compliant retrieval with complete chain-of-custody documentation for litigation support.",
      icon: "📋",
    },
    {
      title: "Vital Records Fulfillment",
      description: "Fast-track ordering for official state certificates required for active litigation.",
      icon: "📜",
    },
    {
      title: "Asset Discovery",
      description: "Comprehensive retrieval with full audit trails for legal discovery and recovery.",
      icon: "🔍",
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable compliance logging for all records.",
      icon: "🔐",
    },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      {/* HEADER - Brand & Utility Nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Brand Insignia */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Geometric Line-Shield Monogram */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              {/* Outer shield */}
              <path d="M22 2L40 10V28C40 36 32 42 22 44C12 42 4 36 4 28V10L22 2Z" 
                fill="#1e293b" stroke="#D4AF37" strokeWidth="2"/>
              {/* Inner shield accent */}
              <path d="M22 8L34 14V26C34 32 29 36 22 38C15 36 10 32 10 26V14L22 8Z" 
                fill="none" stroke="#E2E8F0" strokeWidth="1"/>
              {/* Center PC monogram */}
              <text x="22" y="27" textAnchor="middle" fill="#D4AF37" 
                fontSize="14" fontWeight="800" fontFamily="Arial">PC</text>
              {/* Scale lines */}
              <line x1="14" y1="32" x2="30" y2="32" stroke="#D4AF37" strokeWidth="1"/>
              <line x1="16" y1="35" x2="28" y2="35" stroke="#E2E8F0" strokeWidth="0.5"/>
            </svg>
            
            {/* Wordmark */}
            <div>
              <span style={{ color: '#E2E8F0', fontWeight: '800', letterSpacing: '0.05em', fontSize: '18px' }}>
                PROTOCOL
              </span>
              <span style={{ color: '#D4AF37', fontWeight: '800', fontSize: '18px', marginLeft: '8px' }}>
                COUNSEL
              </span>
            </div>
          </div>

          {/* Utility Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/services" style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Services
            </Link>
            <Link href="/pricing" style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Pricing
            </Link>
            <Link href="/security" style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Security
            </Link>
            <Link href="/company" style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Company
            </Link>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/portal/login" style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
              Client Portal
            </Link>
            <Link href="/demo" style={{
              backgroundColor: '#D4AF37',
              color: '#0f172a',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
            }}>
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO - Two-Column Grid */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        backgroundColor: '#0f172a'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center'
        }}>
          {/* Left Canvas - Value Proposition */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              marginBottom: '24px',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
              <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Enterprise Legal Infrastructure</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: '#f8fafc'
            }}>
              Legal Operations,<br />
              <span style={{ color: '#D4AF37' }}>Institutional Grade.</span>
            </h1>

            <p style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#94a3b8',
              marginBottom: '32px',
              maxWidth: '480px'
            }}>
              The enterprise platform for law firms who demand compliance, efficiency, and results. HIPAA-compliant retrieval, chain-of-custody documentation, and real-time compliance monitoring—all through a single secure platform.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <Link href="/demo" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#D4AF37',
                color: '#0f172a',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
              }}>
                Schedule Consultation
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/portal/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '2px solid #334155',
                color: '#e2e8f0',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none'
              }}>
                View Pricing
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" fill="#22c55e" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span style={{ color: '#64748b', fontSize: '13px' }}>SOC 2 Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" fill="#22c55e" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span style={{ color: '#64748b', fontSize: '13px' }}>No Setup Fees</span>
              </div>
            </div>
          </div>

          {/* Right Canvas - Scales of Justice */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              padding: '48px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid #334155'
            }}>
              {/* Scales of Justice SVG */}
              <svg width="450" height="450" viewBox="0 0 100 100" style={{ stroke: '#D4AF37', strokeWidth: '1.2', fill: 'none' }}>
                {/* Center pillar */}
                <rect x="48" y="8" width="4" height="70" fill="#D4AF37" opacity="0.8"/>
                
                {/* Base */}
                <rect x="35" y="76" width="30" height="6" rx="2" fill="#D4AF37"/>
                <rect x="40" y="70" width="20" height="8" fill="none" stroke="#D4AF37" strokeWidth="1"/>
                
                {/* Top beam */}
                <rect x="8" y="18" width="84" height="4" rx="1" fill="#D4AF37"/>
                
                {/* Left pan chains */}
                <line x1="18" y1="22" x2="18" y2="45" stroke="#D4AF37" strokeWidth="0.8"/>
                <line x1="22" y1="22" x2="22" y2="45" stroke="#D4AF37" strokeWidth="0.8"/>
                
                {/* Right pan chains */}
                <line x1="78" y1="22" x2="78" y2="45" stroke="#D4AF37" strokeWidth="0.8"/>
                <line x1="82" y1="22" x2="82" y2="45" stroke="#D4AF37" strokeWidth="0.8"/>
                
                {/* Left pan */}
                <ellipse cx="20" cy="50" rx="14" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                <line x1="6" y1="50" x2="34" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2,2"/>
                
                {/* Right pan */}
                <ellipse cx="80" cy="50" rx="14" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                <line x1="66" y1="50" x2="94" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2,2"/>
                
                {/* Crown/pommel */}
                <circle cx="50" cy="14" r="4" fill="#D4AF37"/>
                <circle cx="50" cy="14" r="2" fill="#0f172a"/>
                
                {/* Decorative horizontal lines on pillar */}
                <line x1="46" y1="35" x2="54" y2="35" stroke="#D4AF37" strokeWidth="0.5"/>
                <line x1="46" y1="45" x2="54" y2="45" stroke="#D4AF37" strokeWidth="0.5"/>
                <line x1="46" y1="55" x2="54" y2="55" stroke="#D4AF37" strokeWidth="0.5"/>
                
                {/* Corner accents - top left */}
                <path d="M5 5 L5 12 M5 5 L12 5" stroke="#D4AF37" strokeWidth="1"/>
                {/* Corner accents - top right */}
                <path d="M95 5 L95 12 M95 5 L88 5" stroke="#D4AF37" strokeWidth="1"/>
                {/* Corner accents - bottom left */}
                <path d="M5 95 L5 88 M5 95 L12 95" stroke="#D4AF37" strokeWidth="1"/>
                {/* Corner accents - bottom right */}
                <path d="M95 95 L95 88 M95 95 L88 95" stroke="#D4AF37" strokeWidth="1"/>
                
                {/* Text label */}
                <text x="50" y="95" textAnchor="middle" fill="#94a3b8" fontSize="3" fontFamily="Arial">SCALES OF JUSTICE</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ backgroundColor: '#1e293b', padding: '24px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
            <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Trusted Infrastructure
            </span>
            {['SOC 2 Type II', 'HIPAA Certified', 'ISO 27001', 'GDPR Ready', '21 CFR Part 11'].map((badge, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>
                <svg width="16" height="16" fill="#D4AF37" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STAT
      {/* STATS SECTION */}
      <section style={{ backgroundColor: '#0f172a', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
            {[
              { value: '50,000+', label: 'Law Firms Served' },
              { value: '2M+', label: 'Documents Processed' },
              { value: '99.9%', label: 'Platform Uptime' },
              { value: '$500M+', label: 'Client Recoveries' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '48px', fontWeight: '800', color: '#D4AF37', marginBottom: '8px' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE PRODUCT TILES */}
      <section style={{ backgroundColor: '#0f172a', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ color: '#D4AF37', fontSize: '13px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              ◆ Core Platform Modules
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#f8fafc', marginBottom: '16px' }}>
              Operational Infrastructure
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px' }}>
              Enterprise-grade components engineered for regulatory compliance and operational efficiency.
            </p>
          </div>

          {/* Product Tiles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {services.map((service, i) => (
              <div key={i} style={{
                backgroundColor: '#1e293b',
                padding: '28px',
                borderLeft: '4px solid #D4AF37',
                borderRadius: '4px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.6' }}>
                      {service.description}
                    </p>
                    <div style={{ marginTop: '16px' }}>
                      <Link href="/services" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#D4AF37',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}>
                        ◆ Learn More
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ backgroundColor: '#1e293b', padding: '100px 0', borderTop: '1px solid #334155' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: '#f8fafc', marginBottom: '16px' }}>
            Ready to Elevate Your Practice?
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Join thousands of law firms who rely on Protocol Counsel for compliant, efficient service coordination.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/demo" style={{
              backgroundColor: '#D4AF37',
              color: '#0f172a',
              padding: '16px 40px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
            }}>
              Schedule Demo
            </Link>
            <Link href="/contact" style={{
              border: '2px solid #475569',
              color: '#e2e8f0',
              padding: '16px 40px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#020617', padding: '64px 0 32px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
                  <path d="M22 2L40 10V28C40 36 32 42 22 44C12 42 4 36 4 28V10L22 2Z" fill="#1e293b" stroke="#D4AF37" strokeWidth="2"/>
                  <text x="22" y="27" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="800" fontFamily="Arial">PC</text>
                </svg>
                <span style={{ color: '#f8fafc', fontWeight: '700', fontSize: '16px' }}>PROTOCOL COUNSEL</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7' }}>
                Enterprise legal infrastructure for modern law firms and legal departments.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '16px', fontSize: '14px' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Services', 'Pricing', 'Security', 'Compliance'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    <Link href={`/${item.toLowerCase()}`} style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '16px', fontSize: '14px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About', 'Case Studies', 'Partners', 'Careers'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '16px', fontSize: '14px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Privacy Policy', 'Terms of Service', 'Security', 'Cookies'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: '#475569', fontSize: '13px' }}>© 2024 Protocol Counsel. All rights reserved.</p>
            <p style={{ color: '#334155', fontSize: '12px' }}>Technology infrastructure. Licensed providers deliver legal services.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
