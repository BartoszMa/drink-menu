import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/store';
import './index.css';

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


