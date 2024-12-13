import React, { useState } from 'react';
import PdfViewer from './components/PdfViewer';

const App = () => {
  const [pdfWidth, setPdfWidth] = useState(50); // Initial width as a percentage of screen width
  const [highlightEnabled, setHighlightEnabled] = useState(false); // Highlight toggle state
  const [currentColor, setCurrentColor] = useState('yellow'); // Current highlight color
  const [notes, setNotes] = useState([]);
  const pdfUrl = '/Athena.pdf';

  const handleDrag = (e) => {
      const newPdfWidth = (e.clientX / window.innerWidth) * 100;

      console.log(`Mouse Position: ${e.clientX}px`);
      console.log(`Window Width: ${window.innerWidth}px`);
      console.log(`PDF Width: ${newPdfWidth}%`);
      console.log(`Notes Width: ${100 - newPdfWidth}%`);

      if (newPdfWidth > 20 && newPdfWidth < 80) {
          setPdfWidth(newPdfWidth);
      }
  };

  const handleSaveHighlight = (highlight) => {
    setNotes((prevNotes) => [...prevNotes, highlight]);
  };

  return (
      <div className="flex flex-col h-screen w-full m-0 p-0">
          {/* Top bar with highlight toggle and color selection */}
          <div className="p-4 bg-gray-200 border-b border-gray-300 flex items-center gap-4">
              <button
                  className={`px-4 py-2 rounded ${
                      highlightEnabled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-100'
                  }`}
                  onClick={() => setHighlightEnabled((prev) => !prev)}
              >
                  {highlightEnabled ? 'Disable Highlighting' : 'Enable Highlighting'}
              </button>

              {/* Color Selection Buttons */}
              <div className="flex items-center gap-2">
                  <button
                      className={`w-8 h-8 rounded-full border-2 ${
                          currentColor === 'yellow' ? 'border-black' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: 'yellow' }}
                      onClick={() => setCurrentColor('yellow')}
                  ></button>
                  <button
                      className={`w-8 h-8 rounded-full border-2 ${
                          currentColor === 'blue' ? 'border-black' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: 'blue' }}
                      onClick={() => setCurrentColor('blue')}
                  ></button>
                  <button
                      className={`w-8 h-8 rounded-full border-2 ${
                          currentColor === 'green' ? 'border-black' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: 'green' }}
                      onClick={() => setCurrentColor('green')}
                  ></button>
              </div>
          </div>

          <div className="flex grow">
              {/* PDF Viewer Section */}
              <div className="bg-gray-100">
                  <PdfViewer
                      pdfUrl={pdfUrl}
                      pdfWidth={`${(window.innerWidth * pdfWidth) / 100}`}
                      highlightEnabled={highlightEnabled}
                      highlightColor={currentColor} // Pass the selected color
                      onSaveHighlight={handleSaveHighlight}
                  />
              </div>

              {/* Resizable Divider */}
              <div
                  className="w-4 bg-gray-400 cursor-col-resize"
                  onMouseDown={() => {
                      document.addEventListener('mousemove', handleDrag);
                      document.addEventListener('mouseup', () => {
                          document.removeEventListener('mousemove', handleDrag);
                      });
                  }}
              ></div>

              {/* Notes Section */}
              <div
                  style={{ width: `calc(${100 - pdfWidth}% - 1px)` }}
                  className="bg-white p-4"
              >
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  <textarea
                      className="w-full h-full border border-gray-300 rounded p-2"
                      placeholder="Write your notes here..."
                      readOnly
                      value={notes.map((note, index) => `Note ${index + 1}: ${JSON.stringify(note)}\n`).join('\n')}
                  ></textarea>
              </div>
          </div>
      </div>
  );
};

export default App;
