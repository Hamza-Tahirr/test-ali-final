import { pdfjs, Document, Page, TextLayerItem } from 'react-pdf';
import { useState, useCallback, useEffect } from 'react';
import './PDFViewer.css';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Define worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Define type for the position of the popup
interface PopupPosition {
    left: number;
    top: number;
}

// Function to highlight text based on pattern
function highlightPattern(text: string, pattern: RegExp): string {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

// Define props interface for PdfViewer component
interface PdfViewerProps {
    onTextSelect: (text: string) => void;
    fileObject: string;
}

function PdfViewer({ onTextSelect, fileObject }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectedText, setSelectedText] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [options, setOptions] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);

    useEffect(() => {
        const updateSelectedText = () => {
            const selection = window.getSelection();
            if (!selection || !selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const text = selection.toString();

            if (text) {
                setSelectedText(text);
                setOptions(true);
                setPopupPosition({
                    left: rect.left + window.scrollX + rect.width / 2,
                    top: rect.top + window.scrollY - 5,
                });
            }
        };

        document.addEventListener('mouseup', updateSelectedText);
        document.addEventListener('touchend', updateSelectedText);

        return () => {
            document.removeEventListener('mouseup', updateSelectedText);
            document.removeEventListener('touchend', updateSelectedText);
        };
    }, [onTextSelect]);

    const textRenderer = useCallback(
        (textItem: TextLayerItem) => highlightPattern(textItem.str, new RegExp(searchText, 'gi')),
        [searchText]
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const onDocumentLoad = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => {
        changePage(-1);
    };

    const nextPage = () => {
        changePage(1);
    };

    const handleTextSummarisation = () => {
        onTextSelect(selectedText);
        setOptions(false);
    };

    return (
        <div className='pdfviewer'>
          <div className='pageCount'>
              <p>
                  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </p>
              <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  
              >
                  Previous
              </button>
              <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                  
  
                  >
                  Next
              </button>
          </div>
    
    
          <div className='DisplayPDF'>
              { options && (
                  <div className='options'>
                          <button
                              type="button"
                              onClick={handleTextSummarisation}>
                              Summarize 🪄
                          </button>
                  </div>
              )}
              <Document
                  className="doc"
                  onLoadSuccess={onDocumentLoad}
                  file={fileObject}
              >
                  <Page 
                      renderAnnotationLayer={false}
                      pageNumber={pageNumber} 
                      width={550} 
                      customTextRenderer={textRenderer}/> 
  
              </Document>
              
          </div>
      </div>
          
      )
    
    }
    export default PdfViewer;
