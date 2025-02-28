import React, { useState, useEffect } from 'react';
import './Feed.css';
import Post from '../Post/Post';
import NewPost from '../Newpost/Newpost';
import { useAuth } from '../Auth/contexts/AuthContext';
import apiRequest from '../Auth/api/api';

function Feed({selectedChannelId, view}) {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const [trigger, setTrigger] = useState();
  const [profile, setProfile] = useState({});
	useEffect(() => {
		// Fetch posts for the selected channel
		const fetchPosts = async () => {
			const idToken = await currentUser.getIdToken();
			const body = {};
			const response = await apiRequest('/posts/channel/'+selectedChannelId, 'GET', body, idToken);
			setPosts(response.data);
		};

		if (selectedChannelId) {
			fetchPosts();
		}
	}, [selectedChannelId, trigger]);

	useEffect(() => {
			const fetchprofile = async () => {
				const idToken = await currentUser.getIdToken();
				const body = {};
				const response = await apiRequest('/profiles/email/'+currentUser.email, 'GET', body, idToken);
				setProfile(response.data);
			};
			
		if (view === "profile") {
			fetchprofile();
		}
	  }, [view]);
	
  const addPost = async (post) => {
	const idToken = await currentUser.getIdToken();
	const body = post;
	const response = await apiRequest('/posts', 'POST', body, idToken);
	if (response.success === true) {
		setTrigger(Math.random());
	}
  };

return (
<div className="feed">
	<div className="feed_container">
		{view === "profile" &&  (
			<div className="profile__view">
				<div className="profile__details">
					<h2>{profile.fname}{" "}{profile.sname}</h2>
					<p>Display Name: {profile.displayName}</p>
					<p>Email: {profile.email}</p>
					<p>Tagline: {profile.tagline}</p>
					<p>Birthday: {new Date(profile.bdate).toLocaleDateString()}</p>
					{/* Add more profile fields as needed */}
				</div>
			</div>
		)} 

		{view === "home" &&
		<>
		<div className='feed_post'>
			{posts.map((post, index) => (
				<Post key={index} post={post} />
			))}
		</div>
		<NewPost addPost={addPost} channelId={selectedChannelId} />
		</> 
		}
	</div>
</div>
);
}


export default Feed;