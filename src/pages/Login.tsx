import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonButton, 
  IonRippleEffect,
  IonNavLink,
  IonFooter,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  createAnimation,
  useIonViewDidEnter
} from '@ionic/react';
import { useParams, Route, RouteComponentProps, Redirect, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';

import Tab1 from './Tab1';
import Tab2 from './Home';
import Teams from './innerPages/Teams';
import Tournament from './Tournament';

import {
  home,
  person,
  baseball,
  calendar
} from 'ionicons/icons';

import { IonNav } from '@ionic/react';

import SignUp from './signup';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect, onAuthStateChanged,  getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { RouterLink } from '@ionic/core/dist/types/components/router-link/router-link';

const provider = new GoogleAuthProvider();


const firebaseConfig = {
  apiKey: "AIzaSyADz4-Bl5zmdSeqKL9_-R_nVE_cYq0wrNs",
  authDomain: "ucl-world.firebaseapp.com",
  projectId: "ucl-world",
  storageBucket: "ucl-world.appspot.com",
  messagingSenderId: "902007452528",
  appId: "1:902007452528:web:6406d4aaf22276273495b5",
  measurementId: "G-SFSZ0ND31E",
  databaseURL: "https://ucl-world-default-rtdb.asia-southeast1.firebasedatabase.app/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const Tab3: React.FC = () => {
  const history = useHistory();
  const [isAuthed, setAuth] = useState("/login");
 

const [email, setEMail] = useState("");
const [password, setPass] = useState("");
function loginUser(){
  
signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  console.log(user.uid);
  setAuth("/profile");
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});   
}


useIonViewDidEnter(() => {
  console.log('ionViewDidEnter event fired');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user.uid);
      history.push('/profile');
      // ...
    } else {
      // User is signed out
      // ...
    }
  }); 

});
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Player Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>

          <IonItem>
            <IonLabel>Email ID: </IonLabel>
            <IonInput placeholder="MSD_Fan@UCL.com" onIonChange={(e:any) => setEMail(e.target.value)}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Password: </IonLabel>
            <IonInput placeholder="Enter your password" type='password' onIonChange={(e:any) => setPass(e.target.value)}></IonInput>
          </IonItem>

          <IonItem>
            <IonButton className="ion-activatable ripple-parent" onClick={() => loginUser()}>Login<IonRippleEffect></IonRippleEffect></IonButton>
          </IonItem>

          </IonList>

          <IonLabel>Don't have an account yet?</IonLabel>
          <IonButton className="ion-activatable ripple-parent" routerLink='/signup'>Sign Up<IonRippleEffect></IonRippleEffect></IonButton>
 
      </IonContent>
     </IonPage>
  );
};

export default Tab3;
