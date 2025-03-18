import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Components
import App from './components/App/App';

// Redux
import store from './store/store';

// Styles
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('app-container') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
