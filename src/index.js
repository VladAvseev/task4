import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";

initializeApp({
    apiKey: "AIzaSyANfHZqffuukuzC15CvTmbMcnd3j58gcWw",
    authDomain: "task4-9822d.firebaseapp.com",
    projectId: "task4-9822d",
    storageBucket: "task4-9822d.appspot.com",
    messagingSenderId: "846777084457",
    appId: "1:846777084457:web:068d311d04af423f80ca38"
});

export const Context = createContext(null);

const auth = getAuth();
const firestore = getFirestore();

ReactDOM.render(
    <Context.Provider value={{
        auth,
        firestore
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>,
  document.getElementById('root')
);
