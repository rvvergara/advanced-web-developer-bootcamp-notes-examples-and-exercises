import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MemoryApp from './MemoryApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MemoryApp />, document.getElementById('root'));
registerServiceWorker();
