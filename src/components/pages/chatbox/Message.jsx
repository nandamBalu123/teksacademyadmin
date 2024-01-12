// Message.js
import React from 'react';

const Message = ({ text, sender }) => {
    return (
        <div style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: sender === 'user' ? 'right' : 'left' }}>
            <strong>{sender === 'user' ? 'You' : 'Bot'}:</strong> {text}
        </div>
    );
};

export default Message;
