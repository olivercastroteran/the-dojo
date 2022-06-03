import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthContext } from '../hooks';

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    // login the user
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });
      // update states
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  const cleanup = () => {
    setIsCancelled(true);
  };

  return { login, isPending, error, cleanup };
};

export default useLogin;
