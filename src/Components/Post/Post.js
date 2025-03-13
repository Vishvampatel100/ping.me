import React, { useEffect, useState } from 'react';
import './Post.css';
import apiRequest from '../Auth/api/api';
import { useAuth } from '../Auth/contexts/AuthContext.js';

function Post({ post }) {
	const { currentUser } = useAuth();
	const [fileUrl, setFileUrl] = useState(null)
	useEffect(() => {
		const handleDownload = async (fileName) => {
			try {
			const idToken = await currentUser.getIdToken();
			console.log("Downloading file:", idToken);	
			const response = await fetch(process.env.REACT_APP_API_BASE_URL+"/attachments/download/"+ fileName, {
				method: "GET",
				headers: {
				  'authorization': 'Bearer ' + idToken,
				  'api-key': process.env.REACT_APP_API_KEY
				}
			  });
			  
		
			  const blob = await response.blob();
			  const url = window.URL.createObjectURL(blob);
			  setFileUrl(url)
			} catch (error) {
			  console.error("Error:", error);
			  alert("Failed to download the file. Please check the console for details.");
			}
		  };
		if (post?.attachment){
			handleDownload(post.attachment);
		}
		else {
			setFileUrl(null);
		}
	}, [post])
	
  return (
	<div className="post">
		<div className="post__top">
			{/* <img src={post.profilePicture} alt="Profile" className="post__profilePicture" /> */}
			{/* <p>{post.username} \\</p> */}
		</div>
	  <div className="post__content">
		<div className="post__content__head">
			<p>{post.title}</p>
		</div>
		<div className="post__content__body">
			<p>{post.content}</p>
			{fileUrl && (
            <div>
              <img src={fileUrl} alt="Attachment" className="post__attachment" /> {/* For images */}
              {/* For documents, you can use an <iframe> or link:
              <iframe src={fileUrl} title="Document Preview" width="100%" height="500px"></iframe>
              */}
            </div>
          )}
		</div>
		<div className="post__content__foot">
			<p>@{post?.author?.displayName || 'Author Not found'}</p>
		</div>
	  </div>
	</div>
  );
}

export default Post;