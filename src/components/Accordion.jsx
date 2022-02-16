import React, {useState} from 'react';
import cl from './Accordion.module.css'

export default function ControlledAccordions({message, setInput}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={cl.accordion}>
            <div
                className={cl.title}
                onClick={() => setExpanded(!expanded)}
            >
                <h6 style={{ width: '100%', flexShrink: 0 }}>
                    From {message.displayName} at {message.createdAt} : {message.topic}
                </h6>
                <button
                    style={{
                        marginLeft: -70,
                        background: '#0dcaf0',
                        border: '1px, solid #fff',
                        borderRadius: 5
                    }}
                    onClick={() => setInput(message.email)}>Reply</button>
            </div>
            <div className={cl.text} style={{display: expanded ? 'block' : 'none'}}>
                {message.text}
            </div>
        </div>
    );
}