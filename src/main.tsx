import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Defensive check for fetch to prevent "Cannot set property fetch of #<Window> which has only a getter"
// Some libraries or environments might try to overwrite fetch, which fails if it's read-only.
try {
  const originalFetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get: () => originalFetch,
    set: (v) => {
      console.warn('Attempted to overwrite window.fetch. Ignoring to prevent TypeError.', v);
    }
  });
} catch (e) {
  // If we can't redefine it, it might already be a getter-only property.
  // We just ignore the error here as there's not much we can do.
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
