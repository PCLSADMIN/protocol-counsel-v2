import { DemoVideoPlayer, DEMO_SCRIPT } from "@/components/DemoVideoPlayer";

export default function DemoPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>ProtocolCounsel Demo</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Enterprise Legal Operations — Automated</p>
        <p style={{ color: "#888", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Length: {Math.floor(DEMO_SCRIPT[DEMO_SCRIPT.length - 1].timestamp / 60)} min {DEMO_SCRIPT[DEMO_SCRIPT.length - 1].timestamp % 60} sec
        </p>
      </header>
      <DemoVideoPlayer title="ProtocolCounsel Demo" />
    </main>
  );
}