// Modern browsers don't need polyfills for React 18 + Vite
import { createRoot } from 'react-dom/client';
// Self-hosted fonts: no third-party font requests (see PrivacyScreen and DESIGN.md).
// Bricolage "standard" carries the opsz, wdth and wght axes the design uses.
import '@fontsource-variable/bricolage-grotesque/standard.css';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource-variable/atkinson-hyperlegible-mono';
import './index.css';
import './normalize.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);