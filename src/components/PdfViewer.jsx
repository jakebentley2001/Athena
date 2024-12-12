
import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Button, Position, Tooltip } from '@react-pdf-viewer/core';

const PdfViewer = ({ pdfUrl, pdfWidth }) => {
    const [highlights, setHighlights] = useState([]);


    const renderHighlightContent = (props) => (
        <div
            style={{
                background: '#fff',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '2px',
                padding: '8px',
                maxWidth: '400px',
                wordBreak: 'break-word',
            }}
        >
            <div>{props.selectedText}</div>
        </div>
    );

    const renderHighlightTarget = (props) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
                zIndex: 1000, // Add this line
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Button 
                    onClick={() => {
                        console.log('hello');  // Added console.log
                        console.log('Selected Text:', props.selectedText);  // Log selected text
                        const newHighlight = {
                            content: { text: props.selectedText },
                            position: props.selectionRegion
                        };
                        setHighlights([...highlights, newHighlight]);
                        props.toggle();
                    }}
                >
                    <MessageIcon />
                </Button>
                }
                content={() => <div style={{ width: '100px' }}>Add highlight</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );
    

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlights: (props) => (
            <div>
                {highlights.map((highlight, index) => (
                    <div
                        key={index}
                        style={Object.assign({
                            background: 'yellow',
                            opacity: 0.4,
                        }, props.getCssProperties(highlight.position, props.rotation))}
                    />
                ))}
            </div>
        ),
        trigger: Trigger.TextSelection
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
            
            {/* Optional: Display highlights list */}
            <div style={{ marginTop: '1rem' }}>
                <h3>Highlights:</h3>
                {highlights.map((highlight, index) => (
                    <div key={index} style={{ margin: '8px 0' }}>
                        {highlight.content.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PdfViewer;
