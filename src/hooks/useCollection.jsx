import { useEffect, useRef, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// c : collection
// _q : query
// _o : orderBy

const useCollection = (c, _q, _o) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // setup query
  // If not use a ref --> infinite loop in useEffect
  // _q is an array (reference type) and is 'different' on every function call
  // same with _o
  const q = useRef(_q).current;
  const o = useRef(_o).current;

  useEffect(() => {
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (o) {
      ref = query(ref, orderBy(...o));
    }

    // snapshot represents that collection in that moment in time
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        // update state
        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError(err.message);
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [c, q, o]);

  return { documents, error };
};

export default useCollection;
