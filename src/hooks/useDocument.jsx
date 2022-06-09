import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for the document
  useEffect(() => {
    const ref = doc(db, c, id);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('No such document exist');
        }
      },
      (err) => {
        console.log(err);
        setError('Failed to get Document');
      }
    );

    return () => unsub();
  }, [c, id]);

  return { document, error };
};

export default useDocument;
