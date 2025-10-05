"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useDevice } from "@/hooks/misc/useDevice";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer({ pdfPath, width = 400 }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const { type } = useDevice();

  const fetchPdf = async () => {
    const response = await axios.get(
      `https://galaweb.galahub.tz/api/documents/${pdfPath}`,
      {
        responseType: "blob",
      }
    );
    const pdfBlob = response.data;
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return pdfUrl;
  };

  const {
    data: pdfFile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pdf", pdfPath],
    queryFn: fetchPdf,
    enabled: !!pdfPath,
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

  const pdfFileObj = `https://galaweb.galahub.tz/api/documents/${pdfPath}`;

  return (
    <div className="flex justify-center items-center  w-32">
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
