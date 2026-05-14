// Animated Video Placeholder with Timeline
// Creates a visual placeholder until video is ready

"use client";

import { useState, useEffect } from "react";
import { DEMO_SCRIPT } from "./DemoVideoPlayer";

export function AnimatedPlaceholder() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance through scenes
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => 
        prev < DEMO_SCRIPT.length - 1 ? prev + 1 : 0
      );
    }, 15000); // Advance every 15 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentScene = DEMO_SCRIPT[activeIndex];

  return (
    <div className="animated-placeholder">
      {/* Dashboard mockup */}
      <div className="dashboard-mock">
        <div className="mock-header">
          <div className="mock-logo">PC</div>
          <div className="mock-nav">
            <span>Orders</span>
            <span>Documents</span>
            <span>Billing</span>
          </div>
        </div>
        
        <div className="mock-content">
          {/* Timeline */}
          <div className="mock-timeline">
            <div className="timeline-item active">
              <span className="dot"></span>
              <span className="label">Dashboard</span>
            </div>
            <div className="timeline-item">
              <span className="dot"></span>
              <span className="label">New Order</span>
            </div>
            <div className="timeline-item">
              <span className="dot"></span>
              <span className="label">AI Assistant</span>
            </div>
            <div className="timeline-item">
              <span className="dot"></span>
              <span className="label">Field Agent</span>
            </div>
            <div className="timeline-item">
              <span className="dot"></span>
              <span className="label">Billing</span>
            </div>
            <div className="timeline-item">
              <span className="dot"></span>
              <span className="label">Security</span>
            </div>
          </div>
          
          {/* Active scene indicator */}
          <div className="mock-scene">
            <div className="scene-icon">
              {activeIndex === 0 && "📊"}
              {activeIndex === 1 && "🏛️"}
              {activeIndex === 2 && "📝"}
              {activeIndex === 3 && "🤖"}
              {activeIndex === 4 && "📱"}
              {activeIndex === 5 && "💳"}
              {activeIndex === 6 && "🔐"}
              {activeIndex === 7 && "✅"}
            </div>
            <div className="scene-text">{currentScene.text}</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mock-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((activeIndex + 1) / DEMO_SCRIPT.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-time">
            {Math.floor(currentScene.timestamp / 60)}:{(currentScene.timestamp % 60).toString().padStart(2, "0")} / 1:45
          </div>
        </div>
        
        {/* Controls */}
        <div className="mock-controls">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="play-btn"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button className="mute-btn">🔊</button>
        </div>
      </div>
      
      <style jsx>{`
        .animated-placeholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .dashboard-mock {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }
        
        .mock-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .mock-logo {
          width: 40px;
          height: 40px;
          background: #667eea;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1rem;
        }
        
        .mock-nav {
          display: flex;
          gap: 1rem;
          color: #888;
          font-size: 0.85rem;
        }
        
        .mock-content {
          flex: 1;
          display: flex;
          gap: 2rem;
        }
        
        .mock-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 120px;
        }
        
        .timeline-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #555;
          opacity: 0.6;
        }
        
        .timeline-item.active {
          color: #667eea;
          opacity: 1;
        }
        
        .timeline-item .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #333;
        }
        
        .timeline-item.active .dot {
          background: #667eea;
        }
        
        .mock-scene {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        
        .scene-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .scene-text {
          font-size: 1rem;
          line-height: 1.6;
          max-width: 500px;
          color: #ccc;
        }
        
        .mock-progress {
          margin-top: 1.5rem;
        }
        
        .progress-bar {
          height: 4px;
          background: #333;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #667eea;
          transition: width 0.3s ease;
        }
        
        .progress-time {
          font-size: 0.75rem;
          color: #666;
          margin-top: 0.5rem;
          text-align: right;
        }
        
        .mock-controls {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .play-btn, .mute-btn {
          padding: 0.5rem 1rem;
          background: #333;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-size: 0.85rem;
        }
        
        .play-btn:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}