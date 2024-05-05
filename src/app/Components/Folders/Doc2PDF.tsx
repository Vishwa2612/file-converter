'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import mammoth from 'mammoth';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
});

const WordToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDocument, setPdfDocument] = useState<JSX.Element | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfDocument) {
      const generateBlobUrl = async () => {
        const { url } = await BlobProvider({ document: pdfDocument });
        setPdfBlobUrl(url);
      };
      generateBlobUrl();
    }
  }, [pdfDocument]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPdfDocument(null);
      setPdfBlobUrl(null); 
    }
  };

  const convertToPDF = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const pdf = (
          <Document>
            <Page size="A4" style={styles.page}>
              <View>
                {parseHTMLContent(result.value)}
              </View>
            </Page>
          </Document>
        );
        setPdfDocument(pdf);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const parseHTMLContent = (htmlContent: string) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    return Array.from(div.childNodes).map((node, index) => (
      <Text key={index} style={styles.paragraph}>
        {node.textContent}
      </Text>
    ));
  };

  const clearData = () => {
    setFile(null);
    setPdfDocument(null);
    setPdfBlobUrl(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h2 className='text-green-500 text-4xl font-bold p-3'>Word to PDF</h2>
      <div className='flex flex-col border border-white rounded-lg bg-blue-700 p-3 shadow-md m-10'>
        <input type="file" accept=".docx" onChange={handleFileChange} className="m-4 text-white" />
        {file && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={convertToPDF} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Convert to PDF
            </button>
            <button onClick={clearData} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Clear PDF
            </button>
          </div>
        )}
        {pdfDocument && (
          <div className='flex items-center justify-between p-5'>
            <PDFDownloadLink document={pdfDocument} fileName="converted.pdf" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              {({ loading }) => (loading ? 'Preparing document...' : 'Download PDF')}
            </PDFDownloadLink>
            <button onClick={() => pdfBlobUrl && window.open(pdfBlobUrl, '_blank')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordToPDF;
