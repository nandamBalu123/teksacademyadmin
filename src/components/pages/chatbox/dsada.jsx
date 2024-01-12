// ChatBox.js
import React, { useEffect, useState } from 'react';
import Message from './Message';

const ChatBox = ({ setRefund }) => {
    let role = localStorage.getItem("role")
    let LoggedInuser = JSON.parse(localStorage.getItem("user"));
    let userName = LoggedInuser.fullname;
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
            sender: userName,
            role: role,
            date: new Date()
        };

        setRefund(prevRefund => {
            const updatedChat = Array.isArray(prevRefund[0]?.chat)
                ? [...prevRefund[0].chat, newMessage]
                : [newMessage];

            return [{
                ...prevRefund[0],
                chat: updatedChat
            }];
        });

        setMessages([...messages, newMessage]);
        setInputText('');
    };


    // const handleSendMessage = () => {
    //     if (inputText.trim() === '') {
    //         return;
    //     }

    //     const newMessage = {
    //         id: messages.length + 1,
    //         text: inputText,
    //         sender: 'user',
    //         role: role, // You can set different senders for user and system messages
    //         date: new Date()
    //     };

    //     setRefund(prevRefund => ({
    //         ...prevRefund,
    //         [0]: {
    //             ...prevRefund[0],
    //             chat: [...prevRefund[0].chat, newMessage] // assuming chat is an array of messages
    //         }
    //     }));
    //     setMessages([...messages, newMessage]);
    //     setInputText('');
    // };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {messages.map((message) => (
                    <Message key={message.id} text={message.text} sender={message.sender} role={message.role}
                        date={message.date} />
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
