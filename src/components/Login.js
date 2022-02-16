import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../index";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const Login = () => {
    const {auth} = useContext(Context);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('https://task4-9822d-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            .then(res => res.json())
            .then(res => Object.keys(res).map(key => ({...res[key], key})))
            .then(setUsers);
    }, [])

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
        if (!(users.map(u => u.email)).includes(user.email)) {
            await fetch('https://task4-9822d-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
                method: 'POST',
                body: JSON.stringify({email: user.email, name: user.displayName}),
                headers:
                    {
                        'Content-Type' : 'application/json'
                    }

            })
        }
    }

    return (
        <Container>
            <Grid   container
                style={{height: window.innerHeight - 50, alignItems: 'center', justifyContent: 'center'}}
            >
                <Grid container
                    style={{width: 400, background: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
                    <Box p={5}>
                        <Button onClick={login} variant={'outlined'}>Login with Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;