
import React, { useState, useRef, useEffect } from 'react';
import PdfViewer from './components/PdfViewer';
import axios from 'axios';
import NotesSection from './components/NotesSection';


const App = () => {
    const [pdfWidth, setPdfWidth] = useState(50); // Initial width as a percentage of screen width
    const [highlightEnabled, setHighlightEnabled] = useState(false); // Highlight toggle state
    const [currentColor, setCurrentColor] = useState('yellow'); // Current highlight color
    const [notes, setNotes] = useState([]);
    const pdfUrl = '/dpo.pdf';

    const handleDrag = (e) => {
        const newPdfWidth = (e.clientX / window.innerWidth) * 100;

        if (newPdfWidth > 20 && newPdfWidth < 80) {
            setPdfWidth(newPdfWidth);
        }
    };

    // const handleSaveHighlight = (highlight) => {
    //     setNotes((prevNotes) => [
    //         ...prevNotes,
    //         { id: prevNotes.length + 1, text: `LLM Response: ${highlight}` },
    //     ]);
    
    // };

    const handleSaveHighlight = (highlight) => {
        const responseText = highlight === 'hello' 
            ? 'Add notes here' 
            : `LLM Response: ${highlight}`;
        
        setNotes((prevNotes) => [
            ...prevNotes,
            { id: prevNotes.length + 1, text: responseText },
        ]);
    };

 

    const handleAddNote = () => {
      setNotes((prevNotes) => [
          ...prevNotes,
          { id: prevNotes.length + 1, text: "" },
      ]);
  };

    const handleNoteChange = (id, newText) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, text: newText } : note
            )
        );
    };

    const textAreaRef = useRef();

    useEffect(() => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
          textarea.style.height = 'auto'; // Reset the height
          textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on content
      });
  }, [notes]); // Trigger when notes update

return (
    <div className="flex flex-col h-screen w-full m-0 p-0 bg-gray-900 text-white">
        {/* top bar */}
        <div className="p-2 bg-gray-900 border-b border-gray-700 flex items-center gap-4 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <img
                    src="/highlighter.png"
                    alt="Highlighter"
                    className={`w-8 h-8 cursor-pointer ${
                        highlightEnabled && currentColor === 'yellow' ? 'drop-shadow-[0_0_4px_white]' : ''
                    }`}
                    onClick={() => {
                        setHighlightEnabled(true);
                        setCurrentColor('yellow');
                    }}
                />
                <img
                    src="/question.png"
                    alt="Question"
                    className={`w-8 h-8 cursor-pointer ${
                        highlightEnabled && currentColor === 'blue' ? 'drop-shadow-[0_0_4px_white]' : ''
                    }`}
                    onClick={() => {
                        setHighlightEnabled(true);
                        setCurrentColor('blue');
                    }}
                />
                <img
                    src="/brain.png"
                    alt="Brain"
                    className={`w-8 h-8 cursor-pointer ${
                        highlightEnabled && currentColor === 'green' ? 'drop-shadow-[0_0_4px_white]' : ''
                    }`}
                    onClick={() => {
                        setHighlightEnabled(true);
                        setCurrentColor('green');
                    }}
                />
            </div>
        </div>

        {/* Main content */}
        <div className="flex grow">

            {/* PDF Viewer */}
            <div
                className="bg-gray-800 overflow-y-scroll"
                style={{ width: `${pdfWidth}%`, height: 'calc(100vh - 50px)' }}
            >
                <PdfViewer
                    pdfUrl={pdfUrl}
                    pdfWidth={`${(window.innerWidth * pdfWidth) / 100}`}
                    highlightEnabled={highlightEnabled}
                    highlightColor={currentColor}
                    onSaveHighlight={handleSaveHighlight}
                    onAddNote={handleAddNote}
                />
            </div>

            {/* Divider */}
            <div
                    className="w-4 bg-gray-600 cursor-col-resize"
                    style={{ userSelect: 'none' }} // Prevents text selection
                    onMouseDown={(e) => {
                        e.preventDefault(); // Prevents text selection triggered by the mouse event
                        document.addEventListener('mousemove', handleDrag);
                        document.addEventListener('mouseup', () => {
                            document.removeEventListener('mousemove', handleDrag);
                        });
                    }}
            ></div>

            {/* Notes Section */}
            <div
                className="bg-gray-700 overflow-y-scroll"
                style={{ width: `${100 - pdfWidth}%`, height: 'calc(100vh - 50px)' }}
            >
                <NotesSection
                    notes={notes}
                    handleNoteChange={handleNoteChange}
                    handleAddNote={handleAddNote}
                    setNotes={setNotes}
                />
            </div>
        </div>
    </div>
);
};

export default App;