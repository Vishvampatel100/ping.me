import React, { useState, useRef } from 'react';
import '../Newpost/Newpost.css';
import Assets from '../../assets/Assets';
import { useAuth } from '../Auth/contexts/AuthContext';
import apiRequest from '../Auth/api/api';

function NewPost({ addPost, channelId }) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [resAttachment, setResAttachment] = useState(null);
    const [next, setNext] = useState(false);    
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);

    const handlePost = () => {
        while (!message) {
            window.alert('Please enter a message');
            return;
        }

        handleUpload();
        const newPost = {
            channelId: channelId,
            title: title,
            content: message,
            attachment: resAttachment,
            tags: ['super', 'supreme', 'OoooHo'],
        };

        addPost(newPost);
        setMessage('');
        setTitle('');
        setAttachment(null);
        setNext(false);
    };
    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };
    const handleAttachment = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", attachment);
    
        try {
            const idToken = await currentUser.getIdToken();
            const response = await fetch(process.env.REACT_APP_API_BASE_URL+"/attachments/upload", {
              method: "POST",
              headers: {
                'Authorization': idToken ? 'Bearer ' + idToken : undefined,
                'api-key': process.env.REACT_APP_API_KEY
              },
              body: formData,
            });
    
          if (response.ok) {
            window.alert("File uploaded successfully!");
            const responseData = await response.json();
            setResAttachment(responseData.fileName);
          } else {
            window.alert("Failed to upload the file.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("An error occurred during the upload.");
        }
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
                            <img src={Assets.attachIcon} type="file" onClick={handleAttachmentClick} />
                            <input type="file" ref={fileInputRef} onChange={handleAttachment} style={{ display: "None"}}/>
                            
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