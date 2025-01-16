import axios from 'axios';
import React, { useEffect, useRef } from 'react';

const NotesSection = ({ notes, handleNoteChange, handleAddNote, setNotes, activeHighlightId }) => {

    const noteRefs = useRef({}); // Store refs for all notes

    useEffect(() => {
        if (activeHighlightId && noteRefs.current[activeHighlightId]) {
            const noteElement = noteRefs.current[activeHighlightId];
            noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeHighlightId]);


    return (
        <div
            style={{
                width: 'calc(100% - 1px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            className="bg-gray-800 p-4 text-white"
        >
            <h2 className="text-xl font-bold text-gray-100 mb-4">Playground</h2>
            <div className="flex flex-col gap-2 w-full">
                {notes.map((note) => (
                <div 
                key={note.id}
                ref={(el) => (noteRefs.current[note.id] = el)}  
                className={`p-4 rounded ${
                    note.id === activeHighlightId ? 'border-2 border-white' : 'border border-gray-600'
                }`}
                 >
                <div className="flex items-center gap-2">
                            <textarea
                                className="w-full border border-gray-600 rounded p-2"
                                value={note.text}
                                onChange={(e) => handleNoteChange(note.id, e.target.value)}
                                style={{
                                    height: 'auto',
                                    minHeight: '50px',
                                    overflow: 'hidden',
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor={`question-${note.id}`} className="block text-gray-300 mb-1">
                                Any Questions?
                            </label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    id={`question-${note.id}`}
                                    placeholder="Type your question here..."
                                    className="w-full border border-gray-600 rounded p-2 bg-gray-700 text-gray-300"
                                />
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                    onClick={async () => {
                                        const questionInput = document.getElementById(`question-${note.id}`);
                                        const question = questionInput.value;
                                        if (question) {
                                            try {
                                                const questionObject = { note: question , highlights: note.text};
                                                console.log(questionObject);
                                                const response = await axios.post('http://127.0.0.1:5000/question', questionObject );
                                                const backendResponse = response.data.data;
                                                console.log('Question response:', backendResponse);

                                                // Update the note with the response
                                                setNotes((prevNotes) =>
                                                    prevNotes.map((n) =>
                                                        n.id === note.id
                                                            ? { ...n, response: backendResponse }
                                                            : n
                                                    )
                                                );
                                            } catch (error) {
                                                console.error('Error submitting question:', error);
                                            }
                                        }
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                            {note.response && (
                                <div className="mt-2 p-2 bg-gray-700 text-gray-300 rounded">
                                    <strong>Response:</strong> {note.response}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button
                style={{ marginTop: '20px' }}
                className="px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                onClick={handleAddNote}
            >
                +
            </button>
        </div>
    );
};

export default NotesSection;
