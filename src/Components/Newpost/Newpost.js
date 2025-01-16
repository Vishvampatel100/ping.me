import React, { useState } from 'react';
import '../Newpost/Newpost.css';

function NewPost({ addPost }) {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);

    const handlePost = () => {
        const newPost = {
            username: 'User',
            profilePicture: 'path/to/profile/picture.jpg',
            message,
            attachment,
        };
        addPost(newPost);
        setMessage('');
        setAttachment(null);
    };

    const handleAttachment = (e) => {
        setAttachment(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="newPost">
            <button onClick={handlePost}>Send-it</button>
            <input type="file" onChange={handleAttachment} />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tiger> What's on your mind?"
            />
        </div>
    );
}

export default NewPost;