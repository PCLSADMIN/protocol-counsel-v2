// Portal Embed - Secure iFrame/Widget for law firm sites
// CSP prevents reading frame contents or cookies

export const EMBED_CONFIG = {
  iframeTitle: "ProtocolCounsel Client Portal",
  sandbox: "allow-same-origin allow-scripts",
  frameAncestors: "https://protocolcounsel.com",
};

// Content Security Policy for embed
export function getEmbedCSP(): string {
  return [
    "frame-ancestors 'self' https://protocolcounsel.com",
    "frame-src 'self' https://protocolcounsel.com",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self' api.protocolcounsel.com",
  ].join("; ");
}

// Embed script tag
export function getEmbedScript(clientId: string): string {
  return `<!-- ProtocolCounsel Portal Embed -->
<script>
  (function() {
    var container = document.getElementById('protocol-embed');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://protocolcounsel.com/embed/client/${clientId}';
    iframe.title = 'ProtocolCounsel Client Portal';
    iframe.style.cssText = 'width:100%;height:600px;border:none;';
    iframe.sandbox = 'allow-same-origin allow-scripts';
    container.appendChild(iframe);
  })();
</script>
<div id="protocol-embed"></div>`;
}

// Generate embed code
export function generateEmbedCode(clientId: string): string {
  return getEmbedScript(clientId);
}