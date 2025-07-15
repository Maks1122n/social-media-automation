import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SocialMediaApp from './App';
import { ra } from './config/api.js';

// Делаем ra доступным глобально для совместимости
(window as any).ra = ra;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocialMediaApp />
  </React.StrictMode>
); 