// Note Relay - Scrub agent names before posting to client portal

// Patterns to scrub (agent-identifying info)
const SCRUB_PATTERNS = [
  // Names
  /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, // "John Smith" format
  // Phone numbers
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  // Email addresses
  /\b[\w.-]+@[\w.-]+\.[a-z]{2,}\b/g,
  // Agent ID patterns
  /\bagent[_-]?\d+\b/gi,
];

// Replacement text
const SCRUB_REPLACEMENT = "[REDACTED]";

export interface ScrubResult {
  original: string;
  scrubbed: string;
  scrubbedPatterns: string[];
}

// Scrub agent-identifying info from note
export function scrubAgentNote(content: string): ScrubResult {
  let scrubbed = content;
  const scrubbedPatterns: string[] = [];

  for (const pattern of SCRUB_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        if (!scrubbedPatterns.includes(match)) {
          scrubbedPatterns.push(match);
        }
      }
      scrubbed = scrubbed.replace(pattern, SCRUB_REPLACEMENT);
    }
  }

  return {
    original: content,
    scrubbed,
    scrubbedPatterns,
  };
}

// Check if content contains PII
export function containsPII(content: string): boolean {
  for (const pattern of SCRUB_PATTERNS) {
    if (pattern.test(content)) {
      return true;
    }
  }
  return false;
}

// Format note for client portal (after scrubbing)
export function formatForClientPortal(
  agentName: string,
  content: string
): { content: string; isScrubbed: boolean } {
  const result = scrubAgentNote(content);
  
  return {
    content: result.scrubbed,
    isScrubbed: result.scrubbedPatterns.length > 0,
  };
}

// Generate anonymous agent identifier
export function getAnonymousAgentId(agentId: string): string {
  // Convert to hash-like identifier
  const hash = agentId.split("").reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  return `Agent-${Math.abs(hash).toString(36).toUpperCase()}`;
}