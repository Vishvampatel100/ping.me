import React, { useState, useRef } from 'react';
import '../Newpost/Newpost.css';
import Assets from '../../assets/Assets';
import { useAuth } from '../Auth/contexts/AuthContext';

function NewPost({ addPost, channelId }) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [resAttachment, setResAttachment] = useState(null);
    const [next, setNext] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);

    const handlePost = () => {
        if (!message) {
            window.alert('Please enter a message');
            return;
        }

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
        setResAttachment(null);
        setUploadProgress(0);
        setNext(false);
    };

    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };

    const handleAttachment = (e) => {
        const file = e.target.files[0];
        setAttachment(file);
        handleUpload(file);
    };

    const removeAttachment = () => {
        setAttachment(null);
        setUploadProgress(0);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const idToken = await currentUser.getIdToken();
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/attachments/upload", {
                method: "POST",
                headers: {
                    'Authorization': idToken ? 'Bearer ' + idToken : undefined,
                    'api-key': process.env.REACT_APP_API_KEY
                },
                body: formData,
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
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
        if (!title) {
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
                                <input type="file" ref={fileInputRef} onChange={handleAttachment} style={{ display: "none" }} />
                            </div>
                            <div className="newPost__content">
                            {attachment && (
                                    <div className="newPost__attachmentPreview">
                                        <span>{attachment.name}</span>
                                        <button onClick={removeAttachment} className="removeAttachmentButton">✖</button>
                                        <div className="uploadProgress">
                                            <div className="progressBar" style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                                <textarea
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    rows="1"
                                    style={{ height: 'auto', overflow: 'hidden' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                />
                            </div>
                            <div className="newPost__send">
                                <img src={Assets.sendIcon} onClick={handlePost} alt="send" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="newPost__firstpage">
                            <div className="newPost__title">
                                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Article Heading" required />
                            </div>
                            <div className="newPost__next">
                                <img src={Assets.nextIcon} alt="next" onClick={handleNext} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default NewPost;