import React, { useState } from 'react';
import '../Newpost/Newpost.css';
import Assets from '../../assets/Assets';
function NewPost({ addPost, channelId }) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [next, setNext] = useState(false);    

    const handlePost = () => {
        while (!message) {
            window.alert('Please enter a message');
            return;
        }

        const newPost = {
            channelId: channelId,
            title: title,
            content: message,
            attachment: attachment,
            tags: ['super', 'supreme', 'OoooHo'],
        };
        addPost(newPost);
        setMessage('');
        setTitle('');
        setAttachment(null);
        setNext(false);
    };

    const handleAttachment = (e) => {
        setAttachment(URL.createObjectURL(e.target.files[0]));
    };

    const handleNext = () => {
        while (!title) {
            window.alert('Please enter a Heading');
            return;
        }
        setNext(true);
    }

    return (
        <div className="newPost">
            <div className="newPost_container">
                {next ? (
                    <>
                        <div className="newPost__firstpage">
                            <div className="newPost__attach">
                            <img src={Assets.attachIcon} type="file" onChange={handleAttachment} />
                            </div>
                            <div className="newPost__content">
                                {/* <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind?" /> */}

                                <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."
                                rows="1" style={{ height: 'auto', overflow: 'hidden' }} 
                                onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`;}}/>
                                    
                            </div>
                            <div className="newPost__send">
                                <img src={Assets.sendIcon} onClick={handlePost} alt="send"/>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="newPost__firstpage">
                            <div className="newPost__title">
                                <input type="text" onChange={(e) => setTitle(e.target.value)}  placeholder="Article Heading" required/>
                            </div>
                            <div className="newPost__next">
                                <img src={Assets.nextIcon} alt="next" onClick={handleNext}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default NewPost;