import React from 'react';
import './Post.css';

function Post({ post }) {
  return (
	<div className="post">
		<div className="post__top">
			{/* <img src={post.profilePicture} alt="Profile" className="post__profilePicture" /> */}
			{/* <p>{post.username} \\</p> */}
		</div>
	  <div className="post__content">
		<p className="post__content__head">@ {post.username} </p>
		<p>{post.message}</p>
		{post.attachment && <img src={post.attachment} alt="Attachment" className="post__attachment" />}
	  </div>
	</div>
  );
}

export default Post;