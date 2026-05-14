import { DemoVideoPlayer } from "@/components/DemoVideoPlayer";

export default function DemoPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Platform Demo</h1>
      <p>Watch how ProtocolCounsel handles your legal operations.</p>
      <DemoVideoPlayer title="ProtocolCounsel Overview" />
    </main>
  );
}