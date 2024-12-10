// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Example Project</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <button onClick={() => setCount((count) => count - 1)}>
//           Decrease
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

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

import React from 'react';
import PdfViewer from './components/PdfViewer';

const App = () => {
  const pdfUrl = '/Athena.pdf';

  return (
    <div className="App">
      <h1 className="text-center text-2xl text-blue-200 font-bold mt-4 mb-4">PDF Viewer Example</h1>
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default App;
