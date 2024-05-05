'use client';

import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
  }
});

const ExcelDocument = ({ rows }) => (
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

const Excel2PDF = () => {
  const [rows, setRows] = useState([]);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setRows(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleConvertToPDF = () => {
    const pdfBlob = pdf(ExcelDocument({ rows }));
    pdfBlob.updateContainer(ExcelDocument({ rows }));
    pdfBlob.toBlob().then(blob => {
      const pdfUrl = URL.createObjectURL(blob);
      setPdfObjectUrl(pdfUrl);
    }).catch(error => {
      console.error("Error creating PDF blob: ", error);
    });
  };

  const handleClear = () => {
    setRows([]);
    setPdfObjectUrl(null);
  };

  return (
    <div className='flex flex-col items-center justify-center bg-black p-4'>
      <h2 className='text-green-500 text-4xl font-extrabold p-3'>Excel to PDF</h2>
      <div className='border border-white bg-blue-700 p-3 m-10 rounded-xl items-center justify-center'>
        <input type="file" accept=".xlsx, .xls" title='Upload Excel file' onChange={handleFileUpload} className='text-white m-4'/>
        {rows.length > 0 && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={handleConvertToPDF} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
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