import React, { useRef, useState } from "react";
import { Modal, Button, Alert } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { useDevice } from "@/src/hooks/useDevice";
import { LoadingOutlined } from "@ant-design/icons";
import { LuDownload } from "react-icons/lu";

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl, isOpen, onClose }) => {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(false);
  const [pageWidth, setPageWidth] = useState(null);
  const containerRef = useRef(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const { type } = useDevice();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  React.useEffect(() => {
    if (containerRef.current && isOpen) {
      const updateWidth = () => {
        const width = containerRef.current.clientWidth - 20;
        setPageWidth(width);
      };

      // Initial calculation
      updateWidth();

      // Recalculate on window resize
      window.addEventListener("resize", updateWidth);

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, [isOpen, containerRef]);

  // Effect to load PDF when modal is opened
  React.useEffect(() => {
    const loadPdf = async () => {
      if (isOpen && !pdfData && !useIframe) {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(pdfUrl);
          console.log("Response status:", response.status);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Log response headers to check content type
          console.log("Content-Type:", response.headers.get("Content-Type"));

          const blob = await response.blob();
          console.log("Blob size:", blob.size, "Blob type:", blob.type);

          setPdfBlob(blob);

          setPdfData(URL.createObjectURL(blob));
        } catch (error) {
          console.error("Error fetching PDF:", error);
          setError("Failed to load PDF document");
        } finally {
          setLoading(false);
        }
      }
    };

    loadPdf();

    // Cleanup function
    return () => {
      if (pdfData && !isOpen) {
        URL.revokeObjectURL(pdfData);
        // setPdfData(null);
      }
    };
  }, [isOpen, pdfUrl, pdfData, useIframe]);

  // Navigation functions
  const goToPreviousPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  };

  // Switch to iframe as fallback
  const switchToIframe = () => {
    setUseIframe(true);
    setPdfData(null);
    setError(null);
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "financial_aid_form.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Modal
      title={<div className={`flex justify-center ${type == "mobile" ? "text-xs" : "text-sm"}  font-bold w-full`}>Financial Aid</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={
        useIframe ? null : (
          <div>
            <div key="pdf-controls" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", fontSize: "12px" }}>
              <Button onClick={goToPreviousPage} className="text-xs" disabled={pageNumber <= 1}>
                Previous
              </Button>
              <span>
                Page {pageNumber} of {numPages || "--"}
              </span>
              <Button onClick={goToNextPage} className="text-xs" disabled={pageNumber >= numPages}>
                Next
              </Button>
            </div>
            <div className="flex w-full justify-center py-4">
              <Button className="flex w-full text-xs" icon={<LuDownload size={15} />} onClick={handleDownload} disabled={!pdfBlob} >
                Download
              </Button>
            </div>
          </div>
        )
      }
    >
      <div
        className="flex items-center justify-center"
        ref={containerRef}
        style={{
          height: type === "tablet" ? "600px" : type === "desktop" ? "550px" : type === "mobile" ? "400px" : "auto",
          overflow: "auto",
        }}
      >
        {loading && <LoadingOutlined />}

        {error && (
          <div>
            <Alert message="Error Loading PDF" description={error} type="error" showIcon style={{ marginBottom: "15px" }} />
            <Button type="primary" onClick={switchToIframe}>
              Try alternative viewer
            </Button>
          </div>
        )}

        {useIframe ? (
          <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="600px" style={{ border: "none" }} />
        ) : (
          pdfData &&
          !loading &&
          !error && (
            <Document
              file={pdfData}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                console.error("Error loading PDF:", error);
                setError("Error displaying PDF document: " + error.message);
              }}
            >
              <Page key={`page_${pageNumber}`} pageNumber={pageNumber} width={type == "mobile" ? 300 : type == "tablet" ? 400 : type == "desktop" ? 500 : null} renderTextLayer={true} renderAnnotationLayer={true} />
            </Document>
          )
        )}
      </div>
    </Modal>
  );
};

export default PdfViewer;
