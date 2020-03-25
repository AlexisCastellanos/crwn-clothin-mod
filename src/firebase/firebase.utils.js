import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

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

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const admin = false;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        admin,
        ...additionalData
      })
    } catch (error) {
      console.log('error catching user', error.message);
    }
  }
  return userRef;

}

export const createUserProfileDocument2 = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`orders/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error catching user', error.message);
    }
  }




  const userRef2 = firestore.doc(`orders/${userAuth.uid}`);

  const snapShot2 = await userRef2.get();

  // console.log(snapShot);

  if (!snapShot2.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const admin = false;

    try {
      await userRef2.set({
        displayName,
        email,
        createdAt,
        admin,
        ...additionalData
      })
    } catch (error) {
      console.log('error catching user', error.message);
    }
  }
  return userRef;

}
var docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: firebase.firestore.Timestamp.fromDate(new Date()),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo"
    }
  }
};
export const dummy = (currentUser, items, total) => {
  const createdAt = new Date();
  console.log(currentUser);
  var docData = {
    items: items,
    total: total,
    date: createdAt,
    name: "name 1",
    address: {
      street: "street add",
      city: "city name",
      code: "123",
      state: "state name",
      country: "country name",
      ref: "referances"
    },
    phone1: "123-123-1233",
    phone2: "321-321-321",

  };
  firestore.collection("orders").doc(`${currentUser.id}`).collection("boughts").doc(`${createdAt}`).set(docData).then(function () {
    console.log("Document successfully written!");
  });

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
