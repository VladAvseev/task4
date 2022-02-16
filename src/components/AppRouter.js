import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {privateRoutes, publikRoutes} from "../routes";
import Profile from "./Profile";
import Login from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return user ? (
        <Profile/>
    ) : (
        <Login/>
    )
};

export default AppRouter;