import React from 'react';
import {Toast} from "react-bootstrap";

const MyToast = ({message, handler}) => {
    return (
        <Toast style={{position: 'fixed', right: 50, bottom: 50, zIndex: 20}}>
            <Toast.Header>
                <strong className="me-auto">from {message.displayName}</strong>
                <small>{message.createdAt}</small>
                <button
                    style={{
                    width: 30,
                    zIndex: 2000,
                    marginRight: -30,
                    marginLeft: 10,
                    background: '#fff',
                    border: '1px solid #777',
                    borderRadius: 5
                }}
                    onClick={() => handler()}
                >x</button>
            </Toast.Header>
            <Toast.Body>
                <p><strong>{message.topic}</strong></p>
                <p>{message.text}</p>
            </Toast.Body>
        </Toast>
    );
};

export default MyToast;