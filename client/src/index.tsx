// evidently these imports are necessary for react/vite to work
// the top two (core-js and regenerator) only work properly if declared first
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createRoot } from 'react-dom/client';
import './index.css';
import './normalize.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);