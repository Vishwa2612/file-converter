'use client';

import { useState } from 'react';
import { Document, Page, Image, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  }
});

const ImageToPDF = ({ images }: { images: string[] }) => (
  <Document>
    {images.map((src, index) => (
      <Page size="A4" style={styles.page} key={index}>
        <Image src={src} style={styles.image} />
      </Page>
    ))}
  </Document>
);

const ImageUploader = ({ onImagesUpload }: { onImagesUpload: (files: File[]) => void }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imageFiles = Array.from(event.target.files);
      onImagesUpload(imageFiles);
    }
  };

  return (
    <div className="m-4 text-white">
      <input type="file" title="Upload Image" accept="image/*" multiple onChange={handleImageChange} />
    </div>
  );
};

export default function Image2PDF() {
  const [images, setImages] = useState<string[]>([]);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);

  const handleImagesUpload = (files: File[]) => {
    const readerPromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then(setImages);
  };

  const handleConvertToPDF = () => {
    const document = ImageToPDF({ images });
    const pdfBlob = pdf();
    pdfBlob.updateContainer(document);
    pdfBlob.toBlob().then(blob => {
      const pdfUrl = URL.createObjectURL(blob);
      setPdfObjectUrl(pdfUrl);
    }).catch(error => {
      console.error("Error creating PDF blob: ", error);
    });
  };

  const handleClear = () => {
    setImages([]);
    setPdfObjectUrl(null);
  };

  return (
    <div className="p-4 items-center justify-center flex flex-col bg-black">
      <h2 className='text-green-500 text-4xl font-extrabold p-3'>Images to PDF</h2>
      <div className='flex flex-col border border-white m-10 p-3 rounded-xl bg-blue-700'>
        <ImageUploader onImagesUpload={handleImagesUpload} />
        {images.length > 0 && (
          <div className='flex items-center justify-between p-5'>
            <button onClick={handleConvertToPDF} title='button' className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4">
              Convert to PDF
            </button>
            <button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
              Clear PDF
            </button>
          </div>
        )}
        {pdfObjectUrl && (
          <div className='flex items-center justify-between p-5'>
            <a href={pdfObjectUrl} download="converted-images.pdf" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
