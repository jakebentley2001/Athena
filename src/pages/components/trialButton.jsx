import React from 'react';

const TrialButton = ({label, onClick, style}) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className="px-4 py-2 bg-blue-600 text-red-300 font-semibold rounded hover:bg-blue-950"
        >
            {label}
        </button>
    );
};

export default TrialButton;