import React, {useContext} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader";

function App() {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);
    if(loading) {
        return <Loader/>
    }

    return (
        <div>
            <Navbar/>
            <AppRouter/>
        </div>
    );
}

export default App;
