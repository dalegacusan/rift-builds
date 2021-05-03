import firebase from 'firebase/app';
import 'firebase/auth';
import { Firebase } from '../config/config';
import { store } from '../store/index';
import actionTypes from '../store/actions';

firebase.initializeApp({
	apiKey: Firebase.apiKey,
	authDomain: Firebase.authDomain,
	projectId: Firebase.projectId,
	storageBucket: Firebase.storageBucket,
	messagingSenderId: Firebase.messagingSenderId,
	appId: Firebase.appId,
	measurementId: Firebase.measurementId,
});

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
	auth
		.signInWithPopup(googleProvider)
		.then((res) => {
			store.dispatch({ type: actionTypes.SET_USER, data: res.user });
		})
		.catch((error) => {
			console.log(error.message);
		});
};

export const logout = () => {
	auth
		.signOut()
		.then(() => {
			store.dispatch({ type: actionTypes.SET_USER, data: {} });
		})
		.catch((err) => {
			console.error(err.message);
		});
};
