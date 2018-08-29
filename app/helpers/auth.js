import { ref, firebaseAuth } from 'config/constants'

export const auth = () => {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       name: 'Kenneth Bushman',
  //       avatar: 'https://robohash.org/kenny-b?size=200x200',
  //       uid: 'kbushman',
  //     })
  //   }, 2000)
  // })
}

export const checkIfAuthed = (store) => {
  // Firebase settings here
  return store.getState().users.isAuthed === true
}

export const logout = () => {
  return firebaseAuth().signOut()
}

export const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
