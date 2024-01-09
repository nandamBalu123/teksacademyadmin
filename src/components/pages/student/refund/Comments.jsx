// src/components/CommentsSection.js

import React, { useEffect, useState } from 'react';

const Comment = () => {

    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    console.log("userer", user.fullname)
    const [comments, setComments] = useState([
        // { author: 'John Doe', content: 'Great post!', timestamp: '2022-01-05' },
        // Add more initial comments as needed
    ]);

    const [newComment, setNewComment] = useState({
        author: user.fullname,
        content: '',
    });

    const handleAddComment = () => {
        const updatedComments = [
            ...comments,
            {
                ...newComment,
                timestamp: new Date().toLocaleString(),
            },
        ];
        setComments(updatedComments);
        setNewComment({ author: user.fullname, content: '' });
    };
    useEffect(() => {
        console.log("comments", comments)
    })
    return (
        <div>
            <h2>Comments</h2>
            {comments.map((comment, index) => (
                <div key={index}>
                    <strong>{comment.author} {comment.timestamp}</strong>
                    <p>{comment.content}</p>

                </div>
            ))}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment();
                }}
            >
                <label>
                    {/* Author:{newComment.author} */}
                    {/* <input
                        type="text"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    /> */}
                </label>
                <br />
                <label>
                    Comment:
                    <textarea
                        value={newComment.content}
                        onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    />
                </label>
                <br />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Comment;



// import React from 'react'

// const Refund = () => {
//     return (
//         <div>
//             <div>Student Refund Form</div>
//             <div>
//                 <TextField
//                     label={<span className="label-family">Full Name</span>}
//                     name="fullname"
//                     type="text"
//                     variant="standard"
//                     className="mar w-75  "
//                     required
//                     onChange={(e) => setfullname(e.target.value)}
//                     value={fullname}
//                     id="fullname"
//                 />


//             </div>
//         </div>
//     )
// }

// export default Refund