import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAGSUTGbYOaZonezCTuL5bTi4rQ3924n8A',
  authDomain: 'the-dojo-cf531.firebaseapp.com',
  projectId: 'the-dojo-cf531',
  storageBucket: 'the-dojo-cf531.appspot.com',
  messagingSenderId: '689116156616',
  appId: '1:689116156616:web:0c5a07eb785a706e67cbfd',
};

// Init firebase
const app = initializeApp(firebaseConfig);

// Init firestore
const db = getFirestore(app);

// Init firebase Auth
const auth = getAuth(app);

// Init storage
const storage = getStorage(app);

// timestamp
const timestamp = Timestamp;

export { db, auth, storage, timestamp };
