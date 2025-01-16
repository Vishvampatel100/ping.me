import React, { useState } from 'react';
import './Feed.css';
import Post from '../Post/Post';
import NewPost from '../Newpost/Newpost';
import Header from "../Header/Header";

function Feed() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
	setPosts([post, ...posts]);
  };

  return (
	<div className="feed">
		<Header />
		<div className="feed_container">
		<div className='feed_post'>
			{posts.map((post, index) => (
			<Post key={index} post={post} />
			))}
		</div>
	    <NewPost addPost={addPost} /> 
		</div>
	</div>
  );
}

export default Feed;