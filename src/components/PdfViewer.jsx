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
        if (highlightEnabled) {
            setTimeout(() => {
                console.log('Selected Text:', props.selectionRegion);
                const newHighlight = {
                    id: new Date().getTime(),
                    content: { text: props.selectedText },
                    position: {
                        pageIndex: props.selectionRegion.pageIndex,
                        height: props.selectionRegion.height,
                        width: props.selectionRegion.width,
                        left: props.selectionRegion.left,
                        top: props.selectionRegion.top,
                    }
                };
                setHighlights([...highlights, newHighlight]);
                props.toggle();
            }, 0)
        };
    
        // Return null since we don't need to render the button
        return null;
    };

    const renderHighlights = (props) => (
        <div>
            {highlights
                .filter((highlight) => highlight.position.pageIndex === props.pageIndex) // Filter highlights for the current page
                .map((highlight, idx) => (
                    <div
                        key={highlight.id || idx} // Use the highlight ID if available
                        className="highlight-area"
                        style={Object.assign(
                            {},
                            {
                                background: 'yellow',
                                opacity: 0.4,
                            },
                            props.getCssProperties(highlight.position, props.rotation) // Apply CSS for the highlight
                        )}
                    />
                ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlights, 
        trigger: "TextSelection",
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
