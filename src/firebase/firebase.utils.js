import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCpEzrPAXNsIHKCiLoWqeh9Ln7nHhEp13o",
    authDomain: "crwn-db-mod.firebaseapp.com",
    databaseURL: "https://crwn-db-mod.firebaseio.com",
    projectId: "crwn-db-mod",
    storageBucket: "crwn-db-mod.appspot.com",
    messagingSenderId: "176035101119",
    appId: "1:176035101119:web:91131e583c9d3204f5c90a",
    measurementId: "G-ZDZ7T9TF43"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if(!snapShot.exists){
    const {displayName,email}=userAuth;
    const createdAt=new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error catching user',error.message);
    }
  }
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
