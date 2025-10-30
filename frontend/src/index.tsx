import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create the root element (React 18 syntax)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render your main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
