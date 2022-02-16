import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Button, Container, Grid, Input, TextField} from "@mui/material";
import {getFirestore, collection, serverTimestamp, setDoc, doc} from 'firebase/firestore'
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import ControlledAccordions from "./Accordion";
import MyToast from "./MyToast";

const ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const Profile = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const firestore = getFirestore();
    const [value, setValue] = useState('');
    const [topic, setTopic] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(false);
    const [send, setSend] = useState(false);
    // const [toast, setToast] = useState({show: false, body: {}})
    const [messages, loading] = useCollectionData(
        collection(firestore, `${user.email}`)
    );
    const [toastMes] = useCollectionData(
        collection(firestore, `${user.email}-toast`)
    );

    const sendMessage = async () => {
        const nowDate = new Date();
        if (emails.includes(email)) {
            const time = `${nowDate.toLocaleDateString()} : ${nowDate.toLocaleTimeString()}`;
            await setDoc(doc(firestore, `${email}`, `${ID()}` ), {
                uid: user.uid,
                displayName: user.displayName,
                text: value,
                topic: topic,
                createdAt: time,
                order: serverTimestamp(),
                email: user.email,
            })
            await setDoc(doc(firestore, `${email}-toast`, `toast` ), {
                uid: user.uid,
                displayName: user.displayName,
                text: value,
                topic: topic,
                createdAt: time,
            })
            setValue('');
            setEmail('');
            setTopic('');
            setError(false);
            setSend(true);
            setInterval(() => {
                setSend(false)
            }, 2000)
        } else {
            setError(true);
        }
    }

    async function handler() {
        await setDoc(doc(firestore, `${user.email}-toast`, `toast` ), {
            uid: 1,
            displayName: '',
            text: '',
            topic: '',
            createdAt: '',
        })
    }

    useEffect(() => {
        fetch('https://task4-9822d-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            .then(res => res.json())
            .then(res => Object.keys(res).map(key => ({...res[key], key})))
            .then(setUsers);
    }, [])

    useEffect(() => {
        setEmails(users.filter(u => u.email.includes(email) && u.email !== user.email).map(u => u.email));
    }, [email])

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            {toastMes && toastMes.length && toastMes[0].uid !== 1 ? <MyToast message={toastMes[0]} handler={handler}/> : null}
            <Grid container style={{justifyContent: 'center', marginTop: 10}}>
                <Grid container direction={'column'} alignItems={'flex-end'} style={{width: '80%'}}>
                    {error ? <div style={{background: 'red', border: '2px solid dark-red'}}>User not founded</div> : null}
                    {send ? <div style={{background: 'green', border: '2px solid dark-red'}}>Message sent successfully</div> : null}
                    <Input fullWidth variant={'outlined'} style={{marginBottom: 5}} placeholder='E-mail'
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                    />
                    {email.length ? emails.map(email => (
                        <div style={{cursor: 'pointer', background: '#777', width: '100%', padding: '5px', opacity: 0.8}}
                            key={email} onClick={() => setEmail(email)}
                        >
                            {email}
                        </div>
                    )) : null}
                    <Input fullWidth variant={'outlined'} style={{marginBottom: 5}} placeholder='Topic'
                               value={topic}
                               onChange={e => setTopic(e.target.value)}
                    />
                    <textarea style={{width: '100%', margin: '10px 0'}} placeholder='Message'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={'outlined'}>Send</Button>
                </Grid>
                <div style={{width: '80%', border: '1px solid #777', marginBottom: 20}}>
                    {messages.sort((a, b) => b.order.seconds - a.order.seconds).map((mes, index) => (
                        <ControlledAccordions key={index} message={mes} setInput={(em) => setEmail(em)}/>
                    ))}
                </div>
            </Grid>
        </Container>
    );
};

export default Profile;