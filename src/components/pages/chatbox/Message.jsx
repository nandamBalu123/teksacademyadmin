// Message.js
import React from 'react';
import './Message.css'
const Message = ({ text, sender }) => {
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
                                            <div class="modal-body">
                                                <div class="msg-body" style={{ textAlign: sender === 'user' ? 'left' : 'right' }}>
                                                    <ul>
                                                        <span class="bhavi">{sender === 'user' ? 'You' : 'Bot'}:</span>
                                                        <li class="sender">
                                                            <p> {text} </p>
                                                            <span class="time">10:06 am</span>
                                                        </li>

                                                        <li class="repaly">
                                                            <p>yes!</p>
                                                            <span class="time">10:20 am</span>
                                                        </li>

                                                    </ul>
                                                </div>
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
