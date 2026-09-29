import React, { ChangeEvent, useEffect, useState } from 'react';

interface PDFUploaderProps {
  setFileObject: (url: string) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ setFileObject }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    setFileObject(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile, setFileObject]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
    }
  };

  return (
    <div className="w-1/5 bg-gray-900 p-6 text-gray-200 h-screen">
      <h2 className="w-full font-bold text-lg">ChatPDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      {selectedFile && (
        <div>
          <h3 className='font-bold text-medium'>Selected PDF is</h3>
          <p className='font-bold text-medium'>Name: {selectedFile.name}</p>
          <p className='font-bold text-medium'>Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
