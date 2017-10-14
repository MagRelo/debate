import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

// import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBhtqySO4WXHH9I9q5iAWWo5VirefFrx4w',
  authDomain: 'notlinkedin-5913d.firebaseapp.com',
  databaseURL: 'https://notlinkedin-5913d.firebaseio.com/',
  storageBucket: 'notlinkedin-5913d.appspot.com',
};
// firebase.initializeApp(config);


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

//
export function loginUser() {
  return function(dispatch) {

    const credentials = {
      name: 'matt',
      id: 0
    }

    dispatch(userLoggedIn(credentials))

    var currentLocation = browserHistory.getCurrentLocation()

    if ('redirect' in currentLocation.query)
    {
      return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }

    console.log("requestCredentials")
    console.log(credentials)

    return
  }
}

// export function loginUser() {
//   return function(dispatch) {
//     if (!firebase.auth().currentUser) {
//
//       // [START createprovider]
//       var provider = new firebase.auth.TwitterAuthProvider();
//       // [END createprovider]
//
//       // [START signin]
//       firebase.auth().signInWithPopup(provider)
//         .then(function(result) {
//
//           // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
//           // You can use these server side with your app's credentials to access the Twitter API.
//           var token = result.credential.accessToken;
//           var secret = result.credential.secret;
//
//           // The signed-in user info.
//           var user = result.user;
//
//           // [START_EXCLUDE]
//           // document.getElementById('quickstart-oauthtoken').textContent = token;
//           // document.getElementById('quickstart-oauthsecret').textContent = secret;
//           // [END_EXCLUDE]
//
//         }).catch(function(error) {
//
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           var email = error.email;
//           var credential = error.credential;
//
//           if (errorCode === 'auth/account-exists-with-different-credential') {
//             alert('You have already signed up with a different auth provider for that email.');
//             // If you are using multiple auth providers on your app you should handle linking
//             // the user's accounts here.
//           } else {
//             console.error(error);
//           }
//       });
//     } else {
//       console.warn('User is already logged in.')
//       return null
//     }
//   }
// }
