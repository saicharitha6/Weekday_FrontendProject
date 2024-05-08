import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './components/index';
import App from './App';

const store = configureStore({
  reducer: rootReducer
});

// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
