import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDsNDdIl9n6OdyXBmRUb4ezw5fuO4zbYe8",
    authDomain: "crwn-db-1a9ea.firebaseapp.com",
    databaseURL: "https://crwn-db-1a9ea.firebaseio.com",
    projectId: "crwn-db-1a9ea",
    storageBucket: "",
    messagingSenderId: "980443698859",
    appId: "1:980443698859:web:eae8a808e741e61c"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        
        try {
            await userRef.set ({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle= () => auth.signInWithPopup(provider)

export default firebase