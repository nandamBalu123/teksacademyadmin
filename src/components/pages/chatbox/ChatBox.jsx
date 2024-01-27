// ChatBox.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import SendIcon from '@mui/icons-material/Send';
import './Message.css'
const ChatBox = ({ setRefund,  chat }) => {
    let role = localStorage.getItem("role")

    let LoggedInuser = JSON.parse(localStorage.getItem("user"));
    let userName = LoggedInuser.fullname;
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages(chat)
    }, [chat])

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

        scrollToBottom();
    };
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setMessages(chat);
        scrollToBottom(); // Scroll to the bottom when messages change
    }, [chat]);


    return (
        <div>
            <div style={{ height: '300px', backgroundColor: 'white', overflowY: 'scroll', border: '1px solid #ccc', boxShadow:'0 3px 10px rgb(0 0 0 / 0.2)' }}>
                {messages && messages.length > 0 && messages.map((message) => (
                    <Message key={message.id} text={message.text} sender={message.sender} role={message.role}
                        date={message.date} />
                ))}
                <div ref={messagesEndRef} /> {/* Empty div for scrolling to the bottom */}
            </div>
            {/* <div style={{ height: '300px', backgroundColor: 'white', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {messages && messages.length > 0 && messages.map((message) => (
                    <Message key={message.id} text={message.text} sender={message.sender} role={message.role}
                        date={message.date} />
                ))}
            </div> */}
            {/* <div className='d-flex justify-content-between'>
                <input type="text" value={inputText} onChange={handleInputChange} className='mt-3' placeholder='Type here....' style={{ borderRadius: "5px", borderColor: "#4676a0" }} />
                <button onClick={handleSendMessage} className='mt-3 border-none btn btn-color' ><SendIcon /></button>
            </div> */}
            <div class="send-box">
                <form action="">
                    <input type="text" class="form-control" aria-label="message…"
                        placeholder="Write message…" value={inputText} onChange={handleInputChange} />

                    <button type="button" className='btn btn-color' onClick={handleSendMessage} ><SendIcon />
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ChatBox;
