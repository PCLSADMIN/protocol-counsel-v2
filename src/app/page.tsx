export default function Home() {
  // Services to display (no pricing)
  const services = [
    {
      id: "medical_records",
      name: "Medical Records Retrieval",
      description: "Secure chain of custody for healthcare data requests.",
    },
    {
      id: "skip_trace",
      name: "Skip Tracing",
      description: "Locate individuals for legal service with verified databases.",
    },
    {
      id: "mobile_notary",
      name: "Mobile Notary",
      description: "On-demand certified notaries available 24/7.",
    },
  ];

  return (
    <main>
      <section className="hero">
        <h1>ProtocolCounsel</h1>
        <p>Legal Operations Orchestration Platform</p>
        <p>Secure · Compliant · Transparent</p>
        <a href="/contact" className="cta-button">
          Request Contract Rates
        </a>
      </section>

      <section id="services">
        <h2>Our Services</h2>
        <div className="service-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <a href="/portal/login" className="btn">
                Request Contract Rates
              </a>
            </div>
          ))}
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