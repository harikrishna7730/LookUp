
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/ShopContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

reportWebVitals();
