import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <AppBar position="static">
            <Toolbar variant='dense'>
                <Grid container>
                    {user ?
                        <Button
                            style={{color: '#000', border: '1px solid #000'}} variant={'outlined'}
                            onClick={() => auth.signOut()}
                        >Logout from {user.email}</Button>
                        : <h3>Welcome</h3>
                        // <Button style={{color: '#000', border: '1px solid #000'}} variant={'outlined'}>Login</Button>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;