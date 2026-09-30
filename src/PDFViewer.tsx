import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, useEffect } from 'react';
import './PDFViewer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// react-pdf inserts the returned string as HTML, so the page text is escaped first
function highlightPattern(text: string, pattern: string): string {
    if (!pattern) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegExp(pattern)})`, 'gi');
    return text
        .split(regex)
        .map((part, index) => (index % 2 === 1 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
        .join('');
}

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

    useEffect(() => {
        const updateSelectedText = () => {
            const text = window.getSelection()?.toString();
            if (text) {
                setSelectedText(text);
                setOptions(true);
            }
        };

        document.addEventListener('mouseup', updateSelectedText);
        document.addEventListener('touchend', updateSelectedText);

        return () => {
            document.removeEventListener('mouseup', updateSelectedText);
            document.removeEventListener('touchend', updateSelectedText);
        };
    }, []);

    const textRenderer = useCallback(
        (textItem: { str: string }) => highlightPattern(textItem.str, searchText),
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
                <input
                    type="search"
                    value={searchText}
                    onChange={onChange}
                    placeholder="Search this page"
                />
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </button>
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
                </button>
            </div>

            <div className='DisplayPDF'>
                {options && (
                    <div className='options'>
                        <button
                            type="button"
                            onClick={handleTextSummarisation}
                            className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                        >
                            Summarize
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
                        customTextRenderer={textRenderer}
                    />
                </Document>
            </div>
        </div>
    );
}

export default PdfViewer;
