import { useState } from 'react';

import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './Auth.css';



const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
        <button type='submit'>Sign In</button>
      </form>
        
    </div>
  );
};

export default Auth;