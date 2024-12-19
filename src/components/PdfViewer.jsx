import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
//import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Button, Position, Tooltip } from '@react-pdf-viewer/core';
import { highlightPlugin, HighlightArea, MessageIcon, RenderHighlightContentProps,
    RenderHighlightsProps, RenderHighlightTargetProps,} from '@react-pdf-viewer/highlight';

import axios from 'axios';


const PdfViewer = ({ pdfUrl, pdfWidth, highlightEnabled, highlightColor, onSaveHighlight, onAddNote, onHighlightClick }) => {
    const [highlights, setHighlights] = useState([]);
    const idCounter = useRef(0);
    const processingHighlight = useRef(false); 
    const [debouncedPdfWidth, setDebouncedPdfWidth] = useState(pdfWidth);


    const saveHighlight = async (highlight) => {
        try {
            // Determine the endpoint based on the highlight color
            let endpointUrl = '';
            switch (highlightColor) {
                case 'yellow':
                    endpointUrl = 'http://127.0.0.1:5000/save-yellow';
                    break;
                case 'blue':
                    endpointUrl = 'http://127.0.0.1:5000/save-blue';
                    break;
                case 'green':
                    endpointUrl = 'http://127.0.0.1:5000/save-green';
                    break;
                default:
                    console.error('Invalid highlight color');
                    return;
            }

            // Send the highlight to the determined endpoint
            const response = await axios.post(endpointUrl, highlight);
            console.log(highlight);

            if (highlightColor === 'yellow') {
                onSaveHighlight("hello");
            } else {
                const backendResponse = response.data.data;
                console.log('Highlight saved:', backendResponse);
                // Pass the saved highlight data to the parent component
                onSaveHighlight(backendResponse);
            }

        } catch (error) {
            console.error('Error saving highlight:', error);
        }
    };

    const renderHighlightTarget = (props) => {
        if (highlightEnabled && !processingHighlight.current) {
            processingHighlight.current = true;

            setTimeout(() => {
                console.log('Selected Text:', props.selectedText);
                console.log('Highlight Areas:', props.highlightAreas);

                // Increment the counter and use it as the unique ID
                idCounter.current += 1;
                const newHighlight = {
                    id: idCounter.current, // Use the incremented counter as the ID
                    content: { text: props.selectedText },
                    color: highlightColor, // Store the selected color
                    highlightAreas: props.highlightAreas, // Store all highlight areas
                };

                setHighlights((prevHighlights) => [...prevHighlights, newHighlight]);

                saveHighlight({
                    note: props.selectedText,
                    highlights: props.highlightAreas,
                });
                
                props.toggle(); // Close the selection UI

                processingHighlight.current = false; 
                
            }, 0);
        }

        return null;
    };

    const renderHighlights = (props) => (
        <div>
            {highlights.map((highlight) => (
                <React.Fragment key={highlight.id}>
                    {highlight.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex) // Filter areas for the current page
                        .map((area, idx) => (
                            <div
                                key={`${highlight.id}-${idx}`} // Ensure unique key for each area
                                className="highlight-area"
                                style={Object.assign(
                                    {},
                                    {
                                        width: '100px',
                                        height: '50px',
                                        background: highlight.color,
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        zIndex: 100,
                                        opacity: 0.2,
                                        pointerEvents: 'auto'
                                    },
                                    props.getCssProperties(area, props.rotation) // Apply CSS for the highlight area
                                )}
                                onClick={() => onHighlightClick(highlight.id)} // Notify parent on click
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlights,
        trigger: 'TextSelection',
    });

    // Debounce pdfWidth updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPdfWidth(pdfWidth);
        }, 300); // Adjust delay as needed

        return () => clearTimeout(handler);
    }, [pdfWidth]);
 

    return (
        <div
            className="border border-gray-800 rounded shadow-md bg-white"
            style={{ width: `${pdfWidth}px`, height: '100vh' }}
        >
   
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer key={debouncedPdfWidth} 
                        fileUrl={pdfUrl} 
                        plugins={[highlightPluginInstance]} 
                        theme="dark"
                        defaultScale={debouncedPdfWidth /700} /> 
            </Worker>
        </div>
    );
};

export default PdfViewer;
