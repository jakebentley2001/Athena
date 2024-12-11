
// import React, { useState } from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PdfViewer = ({ pdfUrl }) => {
//   const [width, setWidth] = useState(600); // Initial width in pixels

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//       {/* Slider Section */}
//       <div className="mb-4 text-center">
//         <label htmlFor="width" className="mr-4 text-lg font-semibold">
//           Set Width:
//         </label>
//         <input
//           id="width"
//           type="range"
//           min="300"
//           max="1200"
//           value={width}
//           onChange={(e) => setWidth(e.target.value)}
//           className="w-72 h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="ml-4 text-gray-700">{width}px</span>
//       </div>

//       {/* PDF Viewer Section */}
//       <div
//         className="border border-gray-300 rounded shadow-md bg-white"
//         style={{ width: `${width}px`, height: 'calc(100vh - 150px)' }}
//       >
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//           <Viewer
//             fileUrl={pdfUrl}
//             onDocumentLoadFailed={(error) => {
//               console.error('Failed to load PDF:', error);
//             }}
//           />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;

import React, {useState} from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

const PdfViewer = ({ pdfUrl, pdfWidth }) => {

    const [highlightMode, setHighlightMode] = useState(false);
    // const highlightPluginInstance = highlightPlugin();
    // console.log('Highlight Plugin Instance:', highlightPluginInstance);
    const highlightPluginInstance = highlightPlugin({
        trigger: Trigger.TextSelection,

        renderHighlightContent: (props) => {
            console.log('RenderHighlightContent triggered');
            console.log('Selected Text:', props.selectedText);
            console.log('Highlight Areas:', props.highlightAreas);
        
            if (!props.selectedText || props.highlightAreas.length === 0) {
                console.error('No text selected or highlight areas detected.');
            } else {
                console.log('Highlight works as expected.');
            }
            return <></>;
        },
    });



    highlightPluginInstance.onTextLayerRender = (textLayer) => {
        console.log('Text layer rendered:', textLayer);
        console.log('Text layer element:', textLayer.ele);
    };

    console.log('Highlight Plugin Instance:', highlightPluginInstance);


    const handleSavedHighlights = () => {
        const highlights = highlightPluginInstance.getHighlights();
        console.log('Saved Highlights', highlights);
    }

    return (
        <div
        className="border border-gray-300 rounded shadow-md bg-white"
        style={{ width: `${pdfWidth}px`, height: '100vh' }}
        >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
            fileUrl={pdfUrl}
            plugins={[highlightPluginInstance]}
            onDocumentLoadFailed={(error) => {
                console.error('Failed to load PDF:', error);
            }}
            />
        </Worker>
            {/* Button to save highlights */}
            <div className="p-2">
                <button
                onClick={handleSavedHighlights}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                Save Highlights
                </button>
            </div>
        </div>
    );
};

export default PdfViewer;

