// Message.js
import React from 'react';
import './Message.css'
const Message = ({ text, sender, role, date }) => {
    let LoggedInuser = JSON.parse(localStorage.getItem("user"));
    let userName = LoggedInuser.fullname;
    const formatDateTime = (messageDate) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(messageDate).toLocaleString('en-US', options);
    };



    return (

        <div>
            {/* <div style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: sender === 'user' ? 'left' : 'right' }}> */}

            {/* <span className='border border-black'> <strong>{sender === 'user' ? 'You' : 'Bot'}:</strong>{text}</span> */}


            {/* </div> */}
            <section class="message-area">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="chat-area">
                                {/* <!-- chatbox --> */}
                                <div class="chatbox">
                                    <div class="modal-dialog-scrollable">
                                        <div class="modal-content">

                                            <div class="msg-body" style={{ textAlign: sender === userName ? 'right' : 'left' }}>
                                                <ul>
                                                    <li class="sender">
                                                        <span class="bhavi">{sender && `${sender} (${role && role.charAt(0).toUpperCase() + role.slice(1)})`}:</span>

                                                        <p>  {text} </p>
                                                        <span class="time">  {date && ` ${formatDateTime(date)}`}</span>
                                                    </li>

                                                    {/* <li class="repaly">
                                                            <p>yes!</p>
                                                            <span class="time">10:20 am</span>
                                                        </li> */}

                                                </ul>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- chatbox --> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Message;
