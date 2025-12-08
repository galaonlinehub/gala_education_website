'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function PDFViewerContent() {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('name') || 'Document';
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  // Use proxy to avoid CORS issues
  const proxiedUrl = fileUrl ? `/api/pdf-proxy?url=${encodeURIComponent(fileUrl)}` : null;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.75);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Calculate container width for responsive PDF rendering
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 48;
        const width = availableWidth * 0.85;
        setContainerWidth(Math.max(400, width)); // Minimum width of 400px
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Prevent copying, right-click, and keyboard shortcuts
  useEffect(() => {
    const preventCopy = (e) => {
      e.preventDefault();
      return false;
    };

    const preventRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e) => {
      // Prevent Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, Ctrl+V, etc.
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' ||
          e.key === 'a' ||
          e.key === 's' ||
          e.key === 'p' ||
          e.key === 'v' ||
          e.key === 'x')
      ) {
        e.preventDefault();
        return false;
      }
      // Prevent F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('keydown', preventKeyboardShortcuts);
    document.addEventListener('selectstart', preventCopy);

    // Disable text selection via CSS
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
      document.removeEventListener('selectstart', preventCopy);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, []);

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
            <h1 className="text-lg font-bold text-[#001840] truncate max-w-md">{fileName}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              >
                -
              </button>
              <span className="text-sm font-semibold min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-5xl mx-auto p-4">
        <div
          ref={containerRef}
          className="bg-white rounded-lg shadow-lg p-6"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          <div className="flex justify-center overflow-x-auto">
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
                  <div className="text-red-500">
                    Failed to load PDF. Please try downloading instead.
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth * scale}
                className="mx-auto"
                renderTextLayer={false}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>

          {/* Page Navigation */}
          {numPages && (
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-[#001840] text-white rounded-lg font-bold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-950"
              >
                Previous
              </button>
              <span className="text-sm font-semibold text-[#001840]">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0F4FA] flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <PDFViewerContent />
    </Suspense>
  );
}
