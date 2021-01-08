import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import linkedinclean from '../images/linkedinclean.svg';
import googleicon from '../images/google.svg';
import { auth, signInWithGoogle } from '../firebase/firebase';
import { login } from '../features/userSlice';

function Login() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user: { email, uid, displayName, photoURL } }) => {
        console.log(email);
        dispatch(
          login({
            email: email,
            uid: uid,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert('Please enter a full name!');
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <div className="login__image">
        <img src={linkedinclean} alt="linkedin icon" />
      </div>

      <form>
        <input
          placeholder="Full name (required if registering)"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Profile pic URL (optional)"
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassowrd(e.target.value)}
        />
        <button onClick={loginToApp}>Sign In</button>
      </form>

      <div className="login__divider">
        <span>or</span>
      </div>

      <button className="login__providerbutton" onClick={signInWithGoogle}>
        <img src={googleicon} alt="google icon" />
        <span>Sign in with Google</span>
      </button>

      <p>
        Not a member?{' '}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
