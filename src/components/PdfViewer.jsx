import React, { useState, useRef } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
//import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Button, Position, Tooltip } from '@react-pdf-viewer/core';
import { highlightPlugin, HighlightArea, MessageIcon, RenderHighlightContentProps,
    RenderHighlightsProps, RenderHighlightTargetProps,} from '@react-pdf-viewer/highlight';
import axios from 'axios';

const PdfViewer = ({ pdfUrl, pdfWidth, highlightEnabled, highlightColor, onSaveHighlight, onAddNote }) => {
    const [highlights, setHighlights] = useState([]);
    const idCounter = useRef(0);
    const processingHighlight = useRef(false); 

   

    // const saveHighlight = async (highlight) => {
    //     try {
    //         const response = await axios.post('http://127.0.0.1:5000/save', highlight);
    //         console.log('Highlight saved:', response.data.data);
    //         onSaveHighlight(response.data.data);
    //     } catch (error) {
    //         console.error('Error saving highlight:', error);
    //     }
    // };

    const saveHighlight = async (highlight) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/save', highlight);
            const backendResponse = response.data.data;

            console.log('Highlight saved:', backendResponse);
            onSaveHighlight(backendResponse);

            // Add a new note with the backend response
            onAddNote({
                id: idCounter.current,
                text: backendResponse, // Add the backend response as the note text
            });
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
                                        background: highlight.color, // Use the stored color
                                        opacity: 0.2,
                                    },
                                    props.getCssProperties(area, props.rotation) // Apply CSS for the highlight area
                                )}
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

    return (
        <div
            className="border border-gray-300 rounded shadow-md bg-white"
            style={{ width: `${pdfWidth}px`, height: '100vh' }}
        >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} plugins={[highlightPluginInstance]} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
