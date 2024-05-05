'use client';

import { useState, ChangeEvent } from 'react';
import jsPDF from 'jspdf';

const Text2pdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
      setPdfData(null); 
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const pdf = new jsPDF();
        pdf.text(text, 10, 10);
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (pdfData) {
      const link = document.createElement('a');
      link.href = pdfData;
      link.download = 'converted-file.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPdfData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-black">
      <h2 className='text-green-500 text-4xl font-extrabold p-3'>Text file to PDF</h2>
      <div className='flex flex-col border border-white rounded-lg bg-blue-700 m-10 p-3'>
        <input type="file" title="file" accept=".txt" onChange={handleFileChange} className="m-4 text-white" />
        {file && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
              Convert to PDF
            </button>
            <button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Clear PDF
            </button>
          </div>
        )}
        {pdfData && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={handleDownload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Download PDF
            </button>
            <button onClick={() => window.open(pdfData, '_blank')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-2">
              View PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Text2pdf;