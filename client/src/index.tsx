// Modern browsers don't need polyfills for React 18 + Vite
import { createRoot } from 'react-dom/client';
import './index.css';
import './normalize.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);