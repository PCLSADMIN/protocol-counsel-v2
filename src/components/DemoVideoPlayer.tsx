// Demo Video Player with Script Display

import { AnimatedPlaceholder } from "./AnimatedPlaceholder";

export interface DemoScript {
  timestamp: number;
  text: string;
}

export interface VideoPlayerProps {
  videoUrl?: string;
  script?: DemoScript[];
  title?: string;
}

// Full 2-3 minute demo script
export const DEMO_SCRIPT: DemoScript[] = [
  { timestamp: 0, text: "Legal operations shouldn't feel fragmented, delayed, or difficult. ProtocolCounsel brings intake, scheduling, document handling, field coordination, and billing into one secure workflow." },
  { timestamp: 15, text: "SCENE 2 — LAW FIRM DASHBOARD: Designed for modern law firms, ProtocolCounsel centralizes every stage of the legal service process. From order placement to signed document return, every action is tracked, timestamped, and secured." },
  { timestamp: 30, text: "SCENE 3 — ORDER CREATION: Create new service requests in seconds. Upload secure documents, assign service types, and manage signer instructions through a streamlined workflow." },
  { timestamp: 45, text: "SCENE 4 — AI SCHEDULING ASSISTANT: ProtocolCounsel's AI coordination layer communicates with signers in real time. Appointments are scheduled automatically, updates are logged instantly." },
  { timestamp: 60, text: "SCENE 5 — FIELD AGENT WORKFLOW: Field professionals receive assignments digitally and securely. Completed documents, notes, and status updates sync directly back into the firm portal." },
  { timestamp: 75, text: "SCENE 6 — BILLING + CONTRACTS: Flexible enterprise billing options support both immediate payment and approved net terms. Subscription agreements and account activity are managed transparently." },
  { timestamp: 90, text: "SCENE 7 — TRUST + SECURITY: Security, traceability, and operational reliability are built into every workflow. Every interaction is logged, every document secured, and every order fully auditable." },
  { timestamp: 105, text: "FINAL: ProtocolCounsel. Legal operations—streamlined, automated, and built for scale. Secure your firm's workflow today." },
];

export function DemoVideoPlayer({ videoUrl, title = "ProtocolCounsel Demo" }: VideoPlayerProps) {
  const script: DemoScript[] = DEMO_SCRIPT;

  return (
    <div className="demo-video-container">
      <div className="video-wrapper">
        {videoUrl ? (
          <video src={videoUrl} controls className="demo-video">
            Your browser does not support video.
          </video>
        ) : (
          <AnimatedPlaceholder />
        )}
      </div>
      <div className="script-panel">
        <h4>{title} — Script</h4>
        <ul className="script-list">
          {script.map((line, i) => (
            <li key={i}>
              <span className="timestamp">[{Math.floor(line.timestamp / 60)}:{((line.timestamp % 60)).toString().padStart(2, "0")}]</span>
              <span className="text">{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}