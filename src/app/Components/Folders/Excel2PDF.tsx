'use client';

import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

const styles = StyleSheet.create({
  // Your styles remain unchanged
});

interface ExcelDocumentProps {
  rows: (string | number)[][];
}

const ExcelDocument: React.FC<ExcelDocumentProps> = ({ rows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {rows.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            {row.map((cell, cellIndex) => (
              <View key={cellIndex} style={styles.tableCol}>
                <Text style={styles.tableCell}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Excel2PDF: React.FC = () => {
  const [rows, setRows] = useState<(string | number)[][]>([]);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (e.target?.result) {
            const workbook = XLSX.read(e.target.result as string, { type: 'binary' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setRows(data as (string | number)[][]);
            setIsLoading(false);
          }
        } catch (err) {
          setError('Failed to read the file');
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Error reading file');
        setIsLoading(false);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleConvertToPDF = async () => {
    setIsLoading(true);
    try {
      const document = ExcelDocument({ rows });
      const pdfBlob = pdf(); // Create a new PDF instance
      pdfBlob.updateContainer(document);
      const blob = await pdfBlob.toBlob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfObjectUrl(pdfUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating PDF blob: ", error);
      setError('Error creating PDF');
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRows([]);
    setPdfObjectUrl(null);
    setError(null);
  };

  return (
    <div className='flex flex-col items-center justify-center bg-black p-4'>
      <h2 className='text-green-500 text-4xl font-extrabold p-3'>Excel to PDF</h2>
      <div className='border border-white bg-blue-700 p-3 m-10 rounded-xl items-center justify-center'>
        <input type="file" accept=".xlsx, .xls" title='Upload Excel file' onChange={handleFileUpload} className='text-white m-4'/>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <p>Loading...</p>}
        {rows.length > 0 && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={handleConvertToPDF} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
              Convert to PDF
            </button>
            <button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Clear PDF
            </button>
          </div>
        )}
        {pdfObjectUrl && (
          <div className='flex items-center justify-between p-5'>
            <a href={pdfObjectUrl} download="converted-excel.pdf" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Download PDF
            </a>
            <button onClick={() => window.open(pdfObjectUrl, '_blank')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              View PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Excel2PDF;
