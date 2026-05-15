// ==========================================
// PORTAL DOCUMENTS API
// Document scanning and upload for field agents
// Protocol Counsel - Secure document management
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

// Document storage
const documentsDb = new Map<string, DocumentRecord>();

export interface DocumentRecord {
  id: string;
  orderId: string;
  firmId: string;
  firmName: string;
  
  // Document details
  docType: 'coversheet' | 'affidavit' | 'proof_of_service' | 'signature_page' | 'other';
  fileName: string;
  fileType: string; // pdf, jpg, png
  fileSize: number;
  
  // Upload details
  uploadedBy: string; // agent ID
  uploadedAt: string;
  
  // Status
  status: 'pending_review' | 'approved' | 'archived';
  
  // Notes
  notes?: string;
}

// Generate document ID
function generateDocId(): string {
  return `DOC-${Date.now().toString(36).toUpperCase()}-${randomBytes(4).toString('hex').toUpperCase()}`;
}

/**
 * POST /api/portal/documents
 * Upload/scan document
 */
export async function POST(request: NextRequest) {
  try {
    // In production, this would handle actual file upload
    // For now, we simulate the document record
    const body = await request.json();
    const { orderId, firmId, firmName, docType, fileName, fileType, fileSize, uploadedBy, notes } = body;
    
    if (!orderId || !firmId || !uploadedBy) {
      return NextResponse.json(
        { error: 'Order ID, Firm ID, and Uploader required' },
        { status: 400 }
      );
    }
    
    const document: DocumentRecord = {
      id: generateDocId(),
      orderId,
      firmId,
      firmName: firmName || 'Unknown Firm',
      docType: docType || 'other',
      fileName: fileName || 'document.pdf',
      fileType: fileType || 'pdf',
      fileSize: fileSize || 0,
      uploadedBy,
      uploadedAt: new Date().toISOString(),
      status: 'pending_review',
      notes,
    };
    
    documentsDb.set(document.id, document);
    
    return NextResponse.json({
      success: true,
      document,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/portal/documents
 * List documents for an order or firm
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const firmId = searchParams.get('firmId');
  const status = searchParams.get('status');
  
  let docs = Array.from(documentsDb.values());
  
  if (orderId) {
    docs = docs.filter(d => d.orderId === orderId);
  }
  
  if (firmId) {
    docs = docs.filter(d => d.firmId === firmId);
  }
  
  if (status) {
    docs = docs.filter(d => d.status === status);
  }
  
  // Sort by most recent
  docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  
  return NextResponse.json({ documents: docs, total: docs.length });
}

/**
 * PATCH /api/portal/documents
 * Update document status (approve/archive)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, status, notes } = body;
    
    if (!documentId || !status) {
      return NextResponse.json(
        { error: 'Document ID and status required' },
        { status: 400 }
      );
    }
    
    const doc = documentsDb.get(documentId);
    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    doc.status = status;
    if (notes) {
      doc.notes = notes;
    }
    
    documentsDb.set(documentId, doc);
    
    return NextResponse.json({
      success: true,
      document: doc
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}