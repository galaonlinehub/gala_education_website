"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import { useDevice } from '@/src/hooks/useDevice';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PdfViewer({pdfPath,width=400}) {
  const [pageNumber, setPageNumber] = useState(1); 
  const [numPages, setNumPages] = useState(null);
  const {type} =useDevice() 

  const fetchPdf = async () => {
    const response = await axios.get(`https://galaweb.galahub.org/api/documents/${pdfPath}`, {
      responseType: 'blob', 
    });
    console.log(response.data);
    const pdfBlob = response.data; 
    const pdfUrl = URL.createObjectURL(pdfBlob); 
    return pdfUrl;
  };


  const { data: pdfFile, isLoading, error } = useQuery({
    queryKey: ['pdf'], 
    queryFn: fetchPdf, 
  });

  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); 
  };

  if (isLoading) {
    return <p>Loading PDF...</p>;
  }

  if (error) {
    return <p className="text-xs">No PDF available</p>;
  }

  const pdfFileObj = `https://galaweb.galahub.org/api/documents/${pdfPath}`
  
  return (
    <div className='flex justify-center items-center  w-32'>
      {pdfFile ? (
        <Document
          file={pdfFileObj} 
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-4/5 flex items-center justify-center sm:w-full"
        >
          <Page
            pageNumber={pageNumber}
            scale={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            renderMode="canvas"
            width={width}
          />
        </Document>
      ) : (
        <p>No PDF available</p>
      )}
      {/* {numPages && (
        <p className='text-xs'>
          Page {pageNumber} of {numPages}
        </p>
      )} */}
    </div>
  );
}

export default PdfViewer;