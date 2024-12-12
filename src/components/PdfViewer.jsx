import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Button, Position, Tooltip } from '@react-pdf-viewer/core';


const PdfViewer = ({ pdfUrl, pdfWidth, highlightEnabled }) => {
    const [highlights, setHighlights] = useState([]);

    const renderHighlightTarget = (props) => {
        // Automatically trigger highlight when text is selected
        setTimeout(() => {
            console.log('Selected Text:', props.selectedText);
            const newHighlight = {
                content: { text: props.selectedText },
                position: props.selectionRegion
            };
            setHighlights([...highlights, newHighlight]);
            props.toggle();
        }, 0);
    
        // Return null since we don't need to render the button
        return null;
    };

    let triggerState =  highlightEnabled ? "TextSelection" : "None";
    console.log(triggerState);
    
    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        trigger: triggerState
    });


    return (
        <div
            className="border border-gray-300 rounded shadow-md bg-white"
            style={{ width: `${pdfWidth}px`, height: '100vh' }}
        >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer 
                    fileUrl={pdfUrl} 
                    plugins={[highlightPluginInstance]} 
                />
            </Worker>


        </div>
    );
};

export default PdfViewer;
