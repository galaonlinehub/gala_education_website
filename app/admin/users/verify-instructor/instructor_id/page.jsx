// "use client"
// import React, { useEffect, useState } from 'react'

// function VerifyInstructor({ params }) {
//     const [instructor, setInstructor] = useState(null)

//     useEffect(() => {
//         const fetchInstructor = async () => {
//             // Wait for the promise in params to resolve
//             const resolvedParams = await params
//             setInstructor(resolvedParams.instructor_id)
//         }
//         fetchInstructor()
//     }, [params])

//     console.log("The instructor ID is", instructor)

//     return (
//         <div>
//             VerifyInstructor
//         </div>
//     )
// }

// export default VerifyInstructor



"use client"
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

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
    <div className=' flex flex-col items-center'>
      <div className='max-h-[500px]  w-[60%] overflow-auto'>
      <Document 
        file="/pdf_file.pdf" 
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}  />
      </Document>
      </div>
      <div className='flex gap-4 mt-4'>
        <button 
          onClick={() => changePage(-1)} 
          disabled={pageNumber <= 1}
          className={"rounded p-2 text-center border"}
        >
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button 
          onClick={() => changePage(1)} 
          disabled={pageNumber >= numPages}
          className={"rounded p-2 text-center border"}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;