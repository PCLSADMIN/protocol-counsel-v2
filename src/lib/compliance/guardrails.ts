// Compliance Layer - 2026 Legal Guardrails

export function getDeterministicDPA() {
  return `DETERMINISTIC PROCESSING AGREEMENT

1. PROCESSING METHODOLOGY
All record retrieval uses deterministic, rule-based systems.

2. ATTORNEY RESPONSIBILITY
Final legal review and judgment of all retrieved records remain the responsibility of the attorney of record.

3. NON-TRAINING GUARANTEE
No firm data is used to train external models.

4. COMPLIANCE
Complies with CA SB 53 and CO AI Act.`;
}

export function getFooterDisclaimer() {
  return "Final legal review and judgment of all retrieved records remain the responsibility of the attorney of record.";
}

export function getNonTrainingMeta() {
  return '<meta name="ai-training" content="no-training-certification">';
}