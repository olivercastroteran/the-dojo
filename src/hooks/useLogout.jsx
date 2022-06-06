import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useAuthContext } from '../hooks';
import { doc, updateDoc } from 'firebase/firestore';

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // update online status
      await updateDoc(doc(db, 'users', user.uid), {
        online: false,
      });

      await signOut(auth);

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update states
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
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

  return { logout, isPending, error, cleanup };
};

export default useLogout;
