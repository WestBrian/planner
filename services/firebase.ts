import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJuBZKE5q-VMb7VWT0GNVycGB4SYAK7hQ',
    authDomain: 'planner-8d08f.firebaseapp.com',
    projectId: 'planner-8d08f',
    storageBucket: 'planner-8d08f.appspot.com',
    messagingSenderId: '514273699332',
    appId: '1:514273699332:web:6a6b770942f1008bdb3751',
    measurementId: 'G-0ZS4GZQQSN'
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const getTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp()
export const arrayUnion = (data: any) =>
  firebase.firestore.FieldValue.arrayUnion(data)
