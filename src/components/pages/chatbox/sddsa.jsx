
import React from 'react';



const Message = ({ text, sender, role, date }) => {
    const formatDateTime = (messageDate) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(messageDate).toLocaleString('en-US', options);
    };

    return (
        <div style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: sender === 'user' ? 'right' : 'left' }}>
            <strong>{sender && `${sender} (${role && role.charAt(0).toUpperCase() + role.slice(1)})`}</strong> {text} {date && ` ${formatDateTime(date)}`}
        </div>
    );
};

export default Message;
