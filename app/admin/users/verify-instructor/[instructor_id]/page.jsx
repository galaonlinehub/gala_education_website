"use client"
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => 
      Math.max(1, Math.min(prevPageNumber + offset, numPages))
    );
  }

  return (
    <div className='flex flex-col items-center w-full max-w-4xl mx-auto'>
    <div className='w-full flex justify-center  h-[calc(100vh-200px)] max-h-[36rem] overflow-auto'>
      <Document
        file="/pdf_file.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className='w-full '
      >
        <Page
          pageNumber={pageNumber}
          width={undefined}
          scale={1}
          renderTextLayer={false} // Disable text layer rendering
          renderAnnotationLayer={false}
          renderMode='canvas' // Use canvas rendering instead of text layer
          className='mx-auto w-3/4 bg-red-800'
        />
      </Document>
    </div>
    <div className='flex gap-4 mt-4 w-full justify-center'>
      <button
        onClick={() => changePage(-1)}
        disabled={pageNumber <= 1}
        className='rounded p-2 text-center border disabled:opacity-50 hover:bg-gray-100'
      >
        Previous
      </button>
      <p className='py-2'>
        Page {pageNumber} of {numPages}
      </p>
      <button
        onClick={() => changePage(1)}
        disabled={pageNumber >= numPages}
        className='rounded p-2 text-center border disabled:opacity-50 hover:bg-gray-100'
      >
        Next
      </button>
    </div>
  </div>
  );
}

export default PDFViewer;

// import React from 'react'

// function page() {
//   return (
//     <div>page</div>
//   )
// }

// export default page
