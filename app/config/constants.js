import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAvTQkgFPBVe9VqP77IctofkVjZMQtit9k',
  authDomain: 'react-duckr-app.firebaseapp.com',
  databaseURL: 'https://react-duckr-app.firebaseio.com',
  projectId: 'react-duckr-app',
  storageBucket: 'react-duckr-app.appspot.com',
  messagingSenderId: '660814036666',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 3000000
