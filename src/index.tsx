import React, { Suspense } from 'react';
import './global-styles.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './components/redux/store'

// New way of rendering the app:
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

// function MyComponent() {
//   return (
//     <Provider>
//       <App >
//     <Provider>
//   )
// }

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>

);

// ReactDOM.render(<MyComponent />, document.getElementById('root'));

// import ReactDOM from 'react-dom';
// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// )


/* Old way of rendering:


*/