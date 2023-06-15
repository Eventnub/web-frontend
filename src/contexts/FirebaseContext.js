import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FIREBASE_API } from '../config';
import { requests } from '../api/requests';
import mixpanel from '../utils/mixpanel';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_API);
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const FirebaseContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

function FirebaseProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user && user.emailVerified) {
          const idToken = await firebase.auth().currentUser.getIdToken();
          const { data } = await requests.getUser(user.uid, idToken);
          user = { ...user, ...data, idToken };
          setProfile(user);
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const login = async (email, password) => {
    const credentials = await firebase.auth().signInWithEmailAndPassword(email, password);
    if (!credentials.user.emailVerified) {
      throw new Error('Unverified account! Please verify your account and try again');
    }
  };

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    const names = user.displayName.split(' ');
    const data = {
      provider: 'Google',
      credentials: {
        uid: user.uid,
        firstName: names[0] ? names[0] : 'Not set',
        lastName: names[1] ? names[1] : 'Not set',
        email: user.email,
        favoriteCelebrity: 'Not set',
        ageRange: 'Not set',
      },
    };

    try {
      await requests.registerViaProvider(data);
      mixpanel.track('Signed up', {
        name: user.displayName,
        email: user.email,
        favoriteCelebrity: "Not set",
        method: 'Google',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const updateProfile = async (
    firstName,
    lastName,
    phoneNumber,
    email,
    gender,
    dateOfBirth,
    address,
    country,
    zipCode
  ) => {
    // TODO: Call API to update profile
    console.log({ firstName, lastName, phoneNumber, email, gender, dateOfBirth, address, country, zipCode });
  };

  const auth = { ...state.user };

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid || profile?.id,
          email: auth.email || profile?.email,
          photoURL: profile?.photoUrl || auth.photoURL,
          displayName: auth.displayName || profile?.displayName,
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          isPublic: profile?.isPublic || false,
          registrationTime: profile?.registrationTime || '',
          dateOfBirth: profile?.dateOfBirth || '',
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          gender: profile?.gender || '',
          likedEvents: profile?.likedEvents || [],
          idToken: profile?.idToken || '',
          role: profile?.role || '',
        },
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
