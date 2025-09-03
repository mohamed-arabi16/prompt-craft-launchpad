import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * The entry point of the application.
 * It renders the `App` component into the DOM.
 */
createRoot(document.getElementById("root")!).render(<App />);
