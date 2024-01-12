// ChatBox.js
import React, { useState } from 'react';
import Message from './Message';
import SendIcon from '@mui/icons-material/Send';
import './Message.css'
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
            <div style={{ height: '300px', backgroundColor: 'white', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {messages.map((message) => (
                    <Message key={message.id} text={message.text} sender={message.sender} />
                ))}
            </div>
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
