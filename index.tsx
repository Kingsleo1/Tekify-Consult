import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Suppress benign WebSocket errors caused by disabled HMR inside the preview iframe
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason && 
    (event.reason.message?.includes('WebSocket closed') || 
     typeof event.reason === 'string' && event.reason.includes('WebSocket'))
  ) {
    event.preventDefault();
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);