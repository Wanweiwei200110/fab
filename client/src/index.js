import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import { saveState } from './localStorage'
import thunk from 'redux-thunk'
import firebase from "firebase"



// Combine Reducer
const store = createStore(combineReducers({userReducer}), applyMiddleware(thunk))

store.subscribe(() => {	
  const state = store.getState();	
  Object.keys(state).forEach( key => {	
    saveState(key, state[key])	
  })	
})

const firebaseConfig = {
  apiKey: "AIzaSyCdgdrQCUP-AFFDFNYwl7ecrd2aQFtjKlM",
  authDomain: "csc309-5e855.firebaseapp.com",
  projectId: "csc309-5e855",
  storageBucket: "csc309-5e855.appspot.com",
  messagingSenderId: "976345786984",
  appId: "1:976345786984:web:0c5890c54f0af1190269dd",
  measurementId: "G-896W4MVJ9J"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render((
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
