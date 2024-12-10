// import React from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// // import { pdfjs } from 'react-pdf';

// const PdfViewer = ({ pdfUrl }) => {
//   return (
//     <div style={{ height: '100vh', width: '500%' }}>
//       <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//         <Viewer
//           fileUrl={pdfUrl}
//           onDocumentLoadFailed={(error) => {
//             console.error('Failed to load PDF:', error);
//           }}
//         />
//       </Worker>
//     </div>
//   );
// };

// export default PdfViewer;

// import React, { useState } from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PdfViewer = ({ pdfUrl }) => {
//   const [width, setWidth] = useState(600); // Initial width in pixels

//   return (
//     <div className = "flex flex-col items-center min-h-screen bg-gray-50 p-4">
//         {/* Slider Section */}
//         <div className = "mb-4 text-center">
//         <label htmlFor="width" style={{ marginRight: '10px' }}>Set Width:</label>
//         <input
//           id="width"
//           type="range"
//           min="300"
//           max="1200"
//           value={width}
//           onChange={(e) => setWidth(e.target.value)}
//           style={{ width: '300px' }}
//         />
//         <span style={{ marginLeft: '10px' }}>{width}px</span>
//       </div>
//       <div style={{ width: `${width}px`, height: 'calc(100vh - 100px)' }}>
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//           <Viewer fileUrl={pdfUrl} />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;



import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ pdfUrl }) => {
  const [width, setWidth] = useState(600); // Initial width in pixels

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Slider Section */}
      <div className="mb-4 text-center">
        <label htmlFor="width" className="mr-4 text-lg font-semibold">
          Set Width:
        </label>
        <input
          id="width"
          type="range"
          min="300"
          max="1200"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="w-72 h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="ml-4 text-gray-700">{width}px</span>
      </div>

      {/* PDF Viewer Section */}
      <div
        className="border border-gray-300 rounded shadow-md bg-white"
        style={{ width: `${width}px`, height: 'calc(100vh - 150px)' }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            onDocumentLoadFailed={(error) => {
              console.error('Failed to load PDF:', error);
            }}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
