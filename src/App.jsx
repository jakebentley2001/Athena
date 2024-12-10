// import React from "react";
// import TrialButton from './components/trialButton';
// import PDFViewer from "./components/PdfViewer";

// const App = () => {

//   const handleClick = () => {
//     alert('Button clicked');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-center p-8 bg-white rounded shadow-lg">
//         <h1 className="text-4xl font-extrabold text-blue-500">Hello Vite + Tailwind!</h1>
//         <p className="mt-4 text-blue-500">
//           Build modern UIs with speed and simplicity using Vite and Tailwind CSS.
//         </p>
//         <TrialButton label = "Trial" onClick = {handleClick} />
//         <TrialButton label="Submit" onClick={() => console.log('Submit button clicked')} />
//         <PDFViewer pdfUrl={"public/Athena.pdf"} />
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import PdfViewer from './components/PdfViewer';

// const App = () => {
//   const pdfUrl = '/Athena.pdf';
//   const [pdfWidth, setPdfWidth] = useState(50); // initially splits down the middle

//   const handleDrag = (e) => {
//     const newPdfWidth = (e.clientX / window.innerWidth) * 100;
//     if (newPdfWidth > 20 && newPdfWidth < 80) {
//       setPdfWidth(newPdfWidth);
//     }
//   };

//   return (
//     <div className = "flex h-screen">
//       {/* PDF Viewer Section */}
//       <div style={{width: `${pdfWidth}%`}} className="bg-gray-100">
//         <PdfViewer pdfUrl={pdfUrl} />
//       </div>

//       {/* Resizable Divider */}
//       <div className = "w-1 bg-gray-400 cursor-col-resize"
//         onMouseDown={(e) => {
//           document.addEventListener('mousemove', handleDrag);
//           document.addEventListener('mousup', () => {document.removeEventListener('mousemove',handleDrag)});
//         }}
//       ></div>

//       {/* Notes Section */}
//       <div style = {{ width: `${100 - pdfWidth}%`}} className = "bg-white p-4">
//         <h2 className = "text-xl font-bold mb-4">Notes</h2>
//         <textarea
//           className = "w-full h-full border border-gray300 rounded p-2"
//           placeholder="Write your notes here.. "
//         ></textarea>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import PdfViewer from './components/PdfViewer';

const App = () => {
  const [pdfWidth, setPdfWidth] = useState(50); // Initial width as a percentage of screen width
  const pdfUrl = '/Athena.pdf';

  const handleDrag = (e) => {
    const newPdfWidth = (e.clientX / window.innerWidth) * 100;
      // Log the calculated values for debugging
    console.log(`Mouse Position: ${e.clientX}px`);
    console.log(`Window Width: ${window.innerWidth}px`);
    console.log(`PDF Width: ${newPdfWidth}%`);
    console.log(`Notes Width: ${100 - newPdfWidth}%`);
    
    if (newPdfWidth > 20 && newPdfWidth < 80) {
      setPdfWidth(newPdfWidth);
    }
  };

  return (
    <div className="flex h-screen w-full m-0 p-0">
      {/* PDF Viewer Section */}
      {/*//<div style={{ width: `${pdfWidth}%` }} className="bg-gray-100"> */}
      <div className="bg-gray-100">
        <PdfViewer pdfUrl={pdfUrl} pdfWidth={`${(window.innerWidth * pdfWidth) / 100}`} />
      </div>

      {/* Resizable Divider */}
      <div
        className="w-4 bg-gray-400 cursor-col-resize"
        onMouseDown={() => {
          document.addEventListener("mousemove", handleDrag);
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleDrag);
          });
        }}
      ></div>

      {/* Notes Section */}
      <div style={{ width: `calc(${100 - pdfWidth}% - 1px)` }} className="bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Notes</h2>
        <textarea
          className="w-full h-full border border-gray-300 rounded p-2"
          placeholder="Write your notes here..."
        ></textarea>
      </div>
    </div>

  );
};

export default App;
