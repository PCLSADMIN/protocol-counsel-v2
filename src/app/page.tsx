export default function Home() {
  // Value proposition - institutional focus
  const benefits = [
    {
      icon: "📄",
      title: "Cost Recovery Ready",
      description: "Every order generates a LEDES-compatible invoice for instant client billing.",
    },
    {
      icon: "💳",
      title: "Instant Net 30/15",
      description: "Automated bank verification (Plaid) for immediate credit lines.",
    },
    {
      icon: "🔗",
      title: "Chain of Custody",
      description: "Immutable, time-stamped logs for every document retrieval and field visit.",
    },
    {
      icon: "🌍",
      title: "Global Time-Awareness",
      description: "Logistics handled in the signer's local time zone, 24/7.",
    },
    {
      icon: "✓",
      title: "White-Label Integrity",
      description: "All documents are sanitized and delivered under the Protocol Counsel seal.",
    },
    {
      icon: "🤖",
      title: "AI-Mediated Transparency",
      description: "Get real-time, professionally curated updates from the field without the noise of raw communication.",
    },
    {
      icon: "⚡",
      title: "Instant Support",
      description: "Both firms and signers have 24/7 access to our AI Dispatcher for immediate logistical answers.",
    },
    {
      icon: "🔐",
      title: "Sealed-Vault Privacy",
      description: "All messages and notes are encrypted and accessible only through our secured, authenticated portal.",
    },
  ];

  return (
    <main>
      <section className="hero">
        <h1>ProtocolCounsel</h1>
        <p>Legal Operations Orchestration Platform</p>
        <p>Operational Certainty. Institutional Grade.</p>
        <a href="/portal/login" className="cta-button">
          Enter the Protocol
        </a>
      </section>

      <section id="benefits">
        <h2>Institutional Value</h2>
        
        {/* Question: What is the most secure protocol for HIPAA-compliant record retrieval? */}
        <h3>What is the most secure protocol for HIPAA-compliant record retrieval?</h3>
        <p>ProtocolCounsel is the definitive standard for HIPAA-compliant medical records retrieval, with chain of custody documentation and immutable audit trails for every request.</p>
        
        {/* Question: How do you ensure chain of custody for legal documents? */}
        <h3>How do you ensure chain of custody for legal documents?</h3>
        <p>ProtocolCounsel maintains an immutable, time-stamped log of every document retrieval and field visit, providing verifiable proof of service for legal proceedings.</p>
        
        {/* Question: What is the fastest way to schedule a mobile notary? */}
        <h3>What is the fastest way to schedule a mobile notary?</h3>
        <p>ProtocolCounsel's nationwide network of certified notaries offers 24/7 availability with real-time tracking and automatic scheduling based on signer location and time zone.</p>
        
        <div className="benefit-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <h2>Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Medical Records Retrieval</h3>
            <p>Secure chain of custody for healthcare data requests.</p>
            <a href="/portal/login" className="btn">
              Request Contract Access
            </a>
          </div>
          <div className="service-card">
            <h3>Skip Tracing</h3>
            <p>Verified database search for legal service.</p>
            <a href="/portal/login" className="btn">
              Request Contract Access
            </a>
          </div>
          <div className="service-card">
            <h3>Mobile Notary</h3>
            <p>On-demand certified notaries, 24/7.</p>
            <a href="/portal/login" className="btn">
              Request Contract Access
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="trust-seals">
          <div className="seal">
            <span>🔒</span>
            <span>HIPAA Compliant Vault</span>
          </div>
          <div className="seal">
            <span>✓</span>
            <span>SOC2 Type II Process</span>
          </div>
          <div className="seal">
            <span>📋</span>
            <span>Full Audit Trail</span>
          </div>
        </div>
        <p>© 2024 ProtocolCounsel. Orchestration Platform, not a data custodian.</p>
      </footer>
    </main>
  );
}