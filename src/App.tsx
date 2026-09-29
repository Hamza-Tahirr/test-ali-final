import React, { useState } from 'react';
import PDFUploader from './PDFUpload';
import Chat from './Chat';
import PdfViewer from './PDFViewer';

const App: React.FC = () => {
  const [fileObject, setFileObject] = useState('');
  const [selectedText, setSelectedText] = useState('');

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <PDFUploader setFileObject={setFileObject} />
      <div className="w-3/5 h-screen">
        <PdfViewer onTextSelect={setSelectedText} fileObject={fileObject} />
      </div>
      <Chat selectedText={selectedText} />
    </div>
  );
};

export default App;
