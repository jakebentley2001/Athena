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

import React from "react";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-500">Hello Vite + Tailwind!</h1>
        <p className="mt-4 text-grey-600">
          Build modern UIs with speed and simplicity using Vite and Tailwind CSS.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default App;
