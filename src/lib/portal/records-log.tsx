// Real-time Records Log - Audit trail component for client dashboard

export interface LogEvent {
  id: string;
  timestamp: Date;
  event: string;
  type: "info" | "success" | "warning" | "action";
  details?: string;
}

// Event templates
export const AUDIT_EVENTS = {
  ORDER_PLACED: "Order submitted",
  FIELD_AGENT_DISPATCHED: "Field Agent dispatched",
  DOCUMENT_UPLOADED: "Document sanitized & uploaded",
  DOCUMENT_SIGNED: "Document reviewed & signed",
  SHIPPING_LABEL_GENERATED: "Return label generated",
  COMPLETED: "Order completed",
} as const;

export type AuditEventType = keyof typeof AUDIT_EVENTS;

// Generate unique event ID
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

// Create log event
export function createLogEvent(
  type: AuditEventType,
  details?: string
): LogEvent {
  return {
    id: generateEventId(),
    timestamp: new Date(),
    event: AUDIT_EVENTS[type],
    type: getEventType(type),
    details,
  };
}

function getEventType(
  type: AuditEventType
): "info" | "success" | "warning" | "action" {
  switch (type) {
    case "ORDER_PLACED":
      return "info";
    case "FIELD_AGENT_DISPATCHED":
      return "action";
    case "DOCUMENT_UPLOADED":
    case "DOCUMENT_SIGNED":
      return "success";
    case "COMPLETED":
      return "success";
    default:
      return "info";
  }
}

// Format timestamp for display
export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return formatTimestamp(date);
}

// RecordsLog Component
export function RecordsLog({ events }: { events: LogEvent[] }) {
  const sortedEvents = [...events].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="records-log">
      <h3>Real-time Records Log</h3>
      <div className="log-timeline">
        {sortedEvents.map((event) => (
          <div key={event.id} className={`log-event ${event.type}`}>
            <span className="timestamp">
              {formatTimestamp(event.timestamp)}
            </span>
            <span className="event">{event.event}</span>
            {event.details && (
              <span className="details">{event.details}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Default mock events for demo
export function getDefaultEvents(): LogEvent[] {
  return [
    createLogEvent("ORDER_PLACED", "Case #ORD-2024-0001"),
    createLogEvent("FIELD_AGENT_DISPATCHED", "Agent: John S."),
    createLogEvent("DOCUMENT_UPLOADED", "2 PDFs processed"),
  ];
}