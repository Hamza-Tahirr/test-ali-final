// PDFUpload.tsx

import React, { ChangeEvent, useState } from 'react';
import Chat from './Chat';

const PDFUploader: React.FC = ({setFileObject}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  };
  setFileObject(URL.createObjectURL(selectedFile))
  return (
    <div className="flex">
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
      <div className="w-3/5 h-screen flex flex-col relative">
        {selectedText && (
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded absolute top-0 left-0 m-4" 
          >
            Summarize
          </button>
        )}
        {/* {selectedFile && (
          <embed
            src={URL.createObjectURL(selectedFile)}
            type="application/pdf"
            width="100%"
            height="100%"
            className="flex-grow"
            onMouseUp={handleTextSelection} 
          />
        )} */}
      </div>
      <Chat selectedText={selectedText} />
    </div>
  );
};

export default PDFUploader;
