
import React, { useState, useRef, useEffect } from 'react';
import PdfViewer from './components/PdfViewer';

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

    const handleSaveHighlight = (highlight) => {
        setNotes((prevNotes) => [
            ...prevNotes,
            { id: prevNotes.length + 1, text: `LLM Response: ${highlight}` },
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
        <div className="flex flex-col h-screen w-full m-0 p-0  bg-gray-900 text-white">
            {/* Top bar with highlight toggle and color selection */}
            <div className="p-2 bg-gray-900 border-b border-gray-700 flex items-center gap-4">
                <button
                    className={`px-4 py-2 rounded ${
                        highlightEnabled ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}
                    onClick={() => setHighlightEnabled((prev) => !prev)}
                >
                    {highlightEnabled ? 'Disable Highlighting' : 'Enable Highlighting'}
                </button>

                {/* Color Selection Buttons */}
                <div className="flex items-center gap-2">
                        <img
                            src="/highlighter.png"
                            alt="Highlighter"
                            className={`w-8 h-8 cursor-pointer ${
                                currentColor === 'yellow' ? 'drop-shadow-[0_0_4px_white]' : ''
                            }`}
                            onClick={() => setCurrentColor('yellow')}
                        />
                         <img
                            src="/question.png"
                            alt="Question"
                            className={`w-8 h-8 cursor-pointer ${
                                currentColor === 'blue' ? 'drop-shadow-[0_0_4px_white]' : ''
                            }`}
                            onClick={() => setCurrentColor('blue')}
                        />  
                         <img
                            src="/brain.png"
                            alt="Brain"
                            className={`w-8 h-8 cursor-pointer ${
                                currentColor === 'green' ? 'drop-shadow-[0_0_4px_white]' : ''
                            }`}
                            onClick={() => setCurrentColor('green')}
                        />  
                </div>
            </div>

            <div className="flex grow">
                {/* PDF Viewer Section */}
                <div className="bg-gray-800">
                    <PdfViewer
                        pdfUrl={pdfUrl}
                        pdfWidth={`${(window.innerWidth * pdfWidth) / 100}`}
                        highlightEnabled={highlightEnabled}
                        highlightColor={currentColor}
                        onSaveHighlight={handleSaveHighlight}  
                        onAddNote={handleAddNote}
                    />
                </div>

                {/* Resizable Divider */}
                <div
                    className="w-4 bg-gray-700 cursor-col-resize"
                    onMouseDown={() => {
                        document.addEventListener('mousemove', handleDrag);
                        document.addEventListener('mouseup', () => {
                            document.removeEventListener('mousemove', handleDrag);
                        });
                    }}
                ></div>

                {/* Notes Section */}
                <div
                    style={{ width: `calc(${100 - pdfWidth}% - 1px)`,
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center'}} 
                    className="bg-gray-800 p-4 text-white"
                >
                    <h2 className="text-xl font-bold text-gray-100 mb-4">Notes</h2>
 
                    <div className="flex flex-col gap-2 w-full">
                    {notes.map((note) => (
                        <div key={note.id} className="flex items-center gap-2">
                      
                            <textarea
                                className="w-full border border-gray-600 rounded p-2"
                                value={note.text}
            
                                onChange={(e) => handleNoteChange(note.id, e.target.value)}
                                style={{
                                    height: 'auto', // Reset the height
                                    minHeight: '50px', // Optional: Set a minimum height
                                    overflow: 'hidden', // Hide scrollbar
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto'; // Reset height to calculate new height
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                    console.log(e.target.scrollHeight);// Adjust height
                                }}
                            >
                            </textarea>
                        </div>
                    ))}  
                    </div>
                    <button
                        style={{ marginTop: '20px' }} // Adjust the spacing below the notes
                        className="px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                        onClick={handleAddNote}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;

