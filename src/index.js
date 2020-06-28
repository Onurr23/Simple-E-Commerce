import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import rootReducer from "./Redux/Reducers/RootReducer";
import thunk from "redux-thunk";
import {createStore,applyMiddleware,compose} from "redux";
import {Provider} from "react-redux";

const store = createStore(rootReducer,compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>

            <App />

        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
