// Demo Video Player with Script Display

export interface DemoScript {
  timestamp: number;
  text: string;
}

export interface VideoPlayerProps {
  videoUrl?: string;
  script?: DemoScript[];
  title?: string;
}

export function DemoVideoPlayer({ videoUrl, title = "Platform Demo" }: VideoPlayerProps) {
  const defaultScript: DemoScript[] = [
    { timestamp: 0, text: "Welcome to ProtocolCounsel - Your Legal Operations Platform" },
    { timestamp: 5, text: "Submit a request and instantly see our AI Scheduler activate" },
    { timestamp: 12, text: "GPS Fence verification ensures 100m proof of visit" },
    { timestamp: 18, text: "Auto-generated Cover Sheet and Affidavit ready for court" },
    { timestamp: 25, text: "Finance Dashboard shows real-time P&L per client" },
  ];

  return (
    <div className="demo-video-container">
      <div className="video-wrapper">
        {videoUrl ? (
          <video src={videoUrl} controls className="demo-video">
            Your browser does not support video.
          </video>
        ) : (
          <div className="video-placeholder">
            <div className="play-icon">▶</div>
            <p>Demo Video</p>
            <p className="video-subtitle">Contact support@protocolcounsel.com for live demo</p>
          </div>
        )}
      </div>
      <div className="script-panel">
        <h4>{title} - Script</h4>
        <ul className="script-list">
          {defaultScript.map((line, i) => (
            <li key={i}>
              <span className="timestamp">[{Math.floor(line.timestamp / 60)}:{(line.timestamp % 60).toString().padStart(2, "0")}]</span>
              <span className="text">{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}