// ==========================================
// DOCUMENT SCANNER COMPONENT
// Field Agent Document Upload Interface
// Protocol Counsel - Scan and upload to firm portal
// ==========================================

'use client';

import { useState, useRef } from 'react';

interface DocumentScannerProps {
  orderId: string;
  firmId: string;
  firmName: string;
  agentId: string;
  onUploadComplete?: (docId: string) => void;
}

// Document types
const DOC_TYPES = [
  { value: 'coversheet', label: 'Service Coversheet' },
  { value: 'affidavit', label: 'Affidavit of Service' },
  { value: 'proof_of_service', label: 'Proof of Service' },
  { value: 'signature_page', label: 'Signature Page' },
  { value: 'other', label: 'Other Document' },
];

export function DocumentScanner({ orderId, firmId, firmName, agentId, onUploadComplete }: DocumentScannerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState('coversheet');
  const [notes, setNotes] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<Array<{
    id: string;
    docType: string;
    fileName: string;
    uploadedAt: string;
    status: string;
  }>>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a PDF, JPG, or PNG file');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  // Handle document upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 20, 90));
      }, 200);
      
      // Create form data
      const formData = new FormData();
      formData.append('orderId', orderId);
      formData.append('firmId', firmId);
      formData.append('firmName', firmName);
      formData.append('docType', docType);
      formData.append('fileName', selectedFile.name);
      formData.append('fileType', selectedFile.type.split('/')[1]);
      formData.append('fileSize', selectedFile.size.toString());
      formData.append('uploadedBy', agentId);
      formData.append('notes', notes);
      
      // Make API call (simulated)
      const response = await fetch('/api/portal/documents', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          firmId,
          firmName,
          docType,
          fileName: selectedFile.name,
          fileType: selectedFile.type.split('/')[1],
          fileSize: selectedFile.size,
          uploadedBy: agentId,
          notes,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (response.ok) {
        const result = await response.json();
        
        // Add to uploaded docs list
        setUploadedDocs(prev => [{
          id: result.document.id,
          docType,
          fileName: selectedFile.name,
          uploadedAt: new Date().toISOString(),
          status: 'pending_review',
        }, ...prev]);
        
        // Reset form
        setSelectedFile(null);
        setNotes('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Callback
        if (onUploadComplete) {
          onUploadComplete(result.document.id);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  // Get document type label
  const getDocTypeLabel = (type: string) => {
    return DOC_TYPES.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="bg-[#002147] text-white px-4 py-3 rounded-t-lg">
        <h3 className="font-semibold">Document Scanner</h3>
        <p className="text-xs text-slate-300">Order #{orderId}</p>
      </div>
      
      <div className="p-4">
        {/* Document Type Selection */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#002147] uppercase tracking-wider mb-2">
            Document Type
          </label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg"
            disabled={isUploading}
          >
            {DOC_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* File Selection */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#002147] uppercase tracking-wider mb-2">
            Scan / Upload Document
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              selectedFile 
                ? 'border-[#D4AF37] bg-slate-50' 
                : 'border-slate-300 hover:border-[#002147]'
            }`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            
            {selectedFile ? (
              <div>
                <p className="font-medium text-[#002147]">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <svg className="w-10 h-10 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-6m-4-4V4a2 2 0 00-2-2H8a2 2 0 00-2 2v4m4 0V8a2 2 0 012-2h.01" />
                </svg>
                <p className="text-sm text-slate-600">
                  Click to scan or select file
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF, JPG, or PNG (max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Notes */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#002147] uppercase tracking-wider mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant notes..."
            className="w-full p-2 border border-slate-300 rounded-lg text-sm"
            rows={2}
            disabled={isUploading}
          />
        </div>
        
        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full py-3 bg-[#D4AF37] text-[#002147] font-semibold rounded-lg hover:bg-[#b8962f] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading... {uploadProgress}%
            </span>
          ) : (
            'Upload Document'
          )}
        </button>
        
        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="mt-3">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Previously Uploaded Documents */}
        {uploadedDocs.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs font-bold text-[#002147] uppercase tracking-wider mb-3">
              Recently Uploaded
            </p>
            <div className="space-y-2">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
                  <div>
                    <p className="font-medium text-[#002147]">{getDocTypeLabel(doc.docType)}</p>
                    <p className="text-xs text-slate-500">{doc.fileName}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                    Pending Review
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentScanner;