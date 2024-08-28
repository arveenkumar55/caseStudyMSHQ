import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n'
import store from './redux/configureStore';
import { ThemeProviderContext } from './Theme/ThemeContext';
import { messaging, getToken, onMessage } from './firebase';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProviderContext>

      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProviderContext>,
    </Provider>
  </React.StrictMode>,
);
