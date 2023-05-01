import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { auth, googleProvider } from '../../config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

import './Auth.css';



const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } 
    catch(err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    }
    catch(err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    }
    catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="app__auth">
      <form
        onSubmit={ signIn }
      >
        <input
          type="email"
          placeholder="choaibelmadi@gmail.com"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
        <input
          type="password"
          placeholder="********"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
        <div className='buttons-container'>
          <button type='submit'>Sign In</button>
          <button type='button' onClick={ signInWithGoogle }>Sign In with <FcGoogle size={ 22 } /></button>
          <button type='button' onClick={ logOut }>Log Out</button>
        </div>
      </form>
        
    </div>
  );
};

export default Auth;