// @ts-nocheck

import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import store from './redux/store'
import './styles/global-styles.css';

// Import the necessary parts of node-fetch
// import fetch, { Headers, Request, Response } from 'node-fetch';

// Check if fetch API is not already available in the global scope
// if ( !global.fetch ) {

//   global.fetch = fetch; // Assign fetch function to global scope
//   global.Headers = Headers; // Assign Headers class to global scope
//   global.Request = Request; // Assign Request class to global scope
//   global.Response = Response; // Assign Response class to global scope

// }


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  // <React.StrictMode>
    < Provider store={store}>
      < App />
    </ Provider>
  // </React.StrictMode>

);



/* Old rendering:

ReactDOM.render(<MyComponent />, document.getElementById('root'));

import ReactDOM from 'react-dom';
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
)
*/