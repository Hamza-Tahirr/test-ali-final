// App.tsx

import React, {useState} from 'react';
import PDFUploader from './PDFUpload';
import Chat from './Chat';
import PdfViewer from './PDFViewer';

const App: React.FC = () => {
  const [fileObject, setFileObject] = useState('');
  const [selectedText, setSelectedText] = useState('');
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div>
        <PDFUploader setFileObject={setFileObject}/>
        <PdfViewer setSelectedText={setSelectedText} fileObject={fileObject}/>
      </div>
    </div>
  );
};

export default App;
