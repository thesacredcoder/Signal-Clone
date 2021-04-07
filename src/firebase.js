import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4tKdmeM2H9ZE-QUHSa-hIdPs4_-VhxHY",
  authDomain: "signal-clone-build-94048.firebaseapp.com",
  projectId: "signal-clone-build-94048",
  storageBucket: "signal-clone-build-94048.appspot.com",
  messagingSenderId: "730873598953",
  appId: "1:730873598953:web:b1d2ef12044cdd27d07178",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
