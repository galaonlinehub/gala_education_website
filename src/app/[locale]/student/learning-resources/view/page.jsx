'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import Link from 'next/link';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

function PDFViewerContent() {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('name') || 'Document';

  // Use proxy to avoid CORS issues
  const proxiedUrl = fileUrl ? `/api/pdf-proxy?url=${encodeURIComponent(fileUrl)}` : null;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!fileUrl) {
    return (
      <div className="min-h-screen bg-[#F0F4FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#001840] mb-2">No PDF specified</h2>
          <Link href="/student/learning-resources" className="text-blue-600 hover:underline">
            Go back to portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/student/learning-resources"
              className="flex items-center gap-2 text-[#001840] hover:text-blue-600 font-bold"
            >
              <FaArrowLeft /> Back
            </Link>
            <h1 className="text-lg font-bold text-[#001840] truncate max-w-md">
              {fileName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              >
                -
              </button>
              <span className="text-sm font-semibold min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              >
                +
              </button>
            </div>
            <a

              href={proxiedUrl}
              download={fileName}
              className="flex items-center gap-2 bg-[#001840] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-950"
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Document
            file={proxiedUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center py-20">
                <div className="text-gray-500">Loading PDF...</div>
              </div>
            }
            error={
              <div className="flex items-center justify-center py-20">
                <div className="text-red-500">Failed to load PDF. Please try downloading instead.</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="mx-auto"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>

          {/* Page Navigation */}
          {numPages && (
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-[#001840] text-white rounded-lg font-bold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-950"
              >
                Previous
              </button>
              <span className="text-sm font-semibold text-[#001840]">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-[#001840] text-white rounded-lg font-bold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-950"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ViewPDFPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F0F4FA] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  );
}