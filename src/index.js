import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './components/index';
import App from './App';

const store = configureStore({
  reducer: rootReducer
});

// Use ReactDOM.createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
