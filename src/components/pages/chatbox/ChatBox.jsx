// ChatBox.js
import React, { useState } from 'react';
import Message from './Message';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputText.trim() === '') {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user', // You can set different senders for user and system messages
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {messages.map((message) => (
                    <Message key={message.id} text={message.text} sender={message.sender} />
                ))}
            </div>
            <div className='d-flex'>
                <input type="text" value={inputText} onChange={handleInputChange} className='mt-3' style={{ borderRadius: "5px" }} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
