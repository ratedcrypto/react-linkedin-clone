import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import Post from './Post';
import { db } from '../firebase/firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  // Fetch data for just once
  // useEffect(() => {
  //   db.collection('posts')
  //     .orderBy('timestamp', 'desc')
  //     .get()
  //     .then((snapshot) =>
  //       setPosts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  // }, []);

  const sendPost = (e) => {
    e.preventDefault();

    let post = {
      name: user.displayName,
      description: user.email,
      message: input,
      photUrl: user.photUrl || '',
      likeCount: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('posts').add(post);

    setInput('');

    // Get last document
    // db.collection('posts')
    //   .orderBy('timestamp', 'desc')
    //   .limit(1)
    //   .get()
    //   .then((docs) =>
    //     docs.forEach((doc) =>
    //       setPosts([
    //         {
    //           id: doc.id,
    //           data: doc.data(),
    //         },
    //         ...posts,
    //       ])
    //     )
    //   );
  };

  const increaseLikeCount = (id) => {
    db.collection('posts')
      .doc(id)
      .update({
        likeCount: firebase.firestore.FieldValue.increment(1),
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption title="Photo" Icon={ImageIcon} color="#70B5F9" />
          <InputOption title="Video" Icon={SubscriptionsIcon} color="#E7A33E" />
          <InputOption title="Event" Icon={EventNoteIcon} color="#C0CBCD" />
          <InputOption
            title="Write article"
            Icon={CalendarViewDayIcon}
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({
            id,
            data: { name, description, message, photUrl, likeCount },
          }) => (
            <Post
              key={id}
              id={id}
              name={name}
              description={description}
              message={message}
              photUrl={photUrl}
              likeCount={likeCount}
              increaseLikeCount={increaseLikeCount}
            />
          )
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
