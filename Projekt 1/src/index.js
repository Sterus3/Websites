import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importuj Provider z react-redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'; // Importuj swój store (musisz go utworzyć)

// Owiń aplikację w Provider, aby dostęp do store był możliwy w całej aplikacji
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Provider z store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
