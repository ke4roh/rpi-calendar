import './root.css';

import React from 'react';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

