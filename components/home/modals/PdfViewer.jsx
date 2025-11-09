"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Button, Alert } from "antd";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { LuDownload } from "react-icons/lu";
import { Document, Page, pdfjs } from "react-pdf";

import { useDevice } from "@/hooks/misc/useDevice";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl, isOpen, onClose }) => {
  // Using a unique key to force re-render of Document component
  const [documentKey, setDocumentKey] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [documentLoaded, setDocumentLoaded] = useState(false); // Track document loading state
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(false);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const { type } = useDevice();

  const fetchPdf = useCallback(async () => {
    if (!isOpen || useIframe) return;

    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      setPdfBlob(blob);
    } catch (error) {
      setError("Failed to load PDF document: " + error.message);
      setLoading(false);
    }
  }, [isOpen, pdfUrl, useIframe]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setDocumentLoaded(false); // Reset document loaded state
      setError(null);
      setDocumentKey((prevKey) => prevKey + 1);
      fetchPdf();
    } else {
      cleanupResources();
    }
  }, [fetchPdf, isOpen, pdfUrl]);

  useEffect(() => {
    if (containerRef.current && isOpen) {
      const updateWidth = () => {
        const containerWidth = containerRef.current.clientWidth - 40;

        let baseWidth;
        if (type === "mobile") {
          baseWidth = 300;
          setScale(containerWidth / baseWidth);
        } else if (type === "tablet") {
          baseWidth = 400;
          setScale(containerWidth / baseWidth);
        } else {
          baseWidth = 500;
          setScale(containerWidth / baseWidth);
        }
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, [isOpen, type]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setDocumentLoaded(true); // Mark document as loaded
    setLoading(false);
  }

  // Helper function to clean up resources
  const cleanupResources = () => {
    setNumPages(null);
    setPageNumber(1);
    setError(null);
    setPdfBlob(null);
    setDocumentLoaded(false);
  };

  // Navigation functions
  const goToPreviousPage = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(Math.min(numPages || 1, pageNumber + 1));
  };

  // Switch to iframe as fallback
  const switchToIframe = () => {
    cleanupResources();
    setUseIframe(true);
  };

  // Handle PDF download
  const handleDownload = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "financial_aid_form.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  };

  // Calculate dynamic width
  const getPageWidth = () => {
    if (type === "mobile") return Math.min(280, 300 * scale);
    if (type === "tablet") return Math.min(380, 400 * scale);
    return Math.min(480, 500 * scale);
  };

  return (
    <Modal
      title={
        <div
          className={`flex justify-center ${
            type === "mobile" ? "text-xs" : "text-sm"
          } font-bold w-full`}
        >
          Financial Aid
        </div>
      }
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      destroyOnHidden={true} // Ensure modal is fully destroyed when closed
      footer={
        useIframe ? null : (
          <div>
            <div
              key="pdf-controls"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
              }}
            >
              <Button
                onClick={goToPreviousPage}
                className="text-xs"
                disabled={pageNumber <= 1 || !numPages}
              >
                Previous
              </Button>
              <span>
                Page {pageNumber} of {numPages || "--"}
              </span>
              <Button
                onClick={goToNextPage}
                className="text-xs"
                disabled={!numPages || pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
            <div className="flex w-full justify-center py-4">
              <Button
                className="flex w-full !text-xs"
                icon={<LuDownload size={15} />}
                onClick={handleDownload}
                disabled={!pdfBlob}
              >
                Download
              </Button>
            </div>
          </div>
        )
      }
    >
      <div
        className="flex items-center justify-center px-2"
        ref={containerRef}
        style={{
          height:
            type === "tablet"
              ? "600px"
              : type === "desktop"
              ? "550px"
              : type === "mobile"
              ? "400px"
              : "auto",
          overflow: "auto",
        }}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
            <div className="mt-2">Loading PDF...</div>
          </div>
        )}

        {error && (
          <div className="w-full">
            <Alert
              message="Error Loading PDF"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: "15px" }}
            />
            <Button type="primary" onClick={switchToIframe}>
              Try alternative viewer
            </Button>
          </div>
        )}

        {useIframe ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        ) : (
          isOpen &&
          pdfBlob &&
          !error && (
            <Document
              key={documentKey} // Using key to force re-render
              file={pdfBlob} // Use the blob directly instead of object URL
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                setError("Error displaying PDF: " + error.message);
                setLoading(false);
              }}
              loading={null} // Remove Document loading component to avoid duplicate loading states
            >
              {numPages > 0 && (
                <Page
                  key={`page_${pageNumber}_${documentKey}`}
                  pageNumber={pageNumber}
                  width={getPageWidth()}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={1.2}
                  className="pdf-page"
                  loading={
                    documentLoaded ? (
                      <div className="flex justify-center items-center h-64">
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                        <span className="ml-2">Rendering page...</span>
                      </div>
                    ) : null // Don't show page loading if document isn't loaded yet
                  }
                />
              )}
            </Document>
          )
        )}
      </div>
    </Modal>
  );
};

export default PdfViewer;
