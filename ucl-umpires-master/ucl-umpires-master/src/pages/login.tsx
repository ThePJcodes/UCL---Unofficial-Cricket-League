import { IonApp, IonRouterOutlet,IonLabel, IonRadio, IonRadioGroup, setupIonicReact, IonRippleEffect, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, IonInput, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory  } from 'react-router-dom';
import { IonList, IonItem, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

import App from '../App';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvjB17tbBDuypmNzLWwjHLHjSoTNTz1vE",
  authDomain: "sportshost-5b31f.firebaseapp.com",
  databaseURL: "https://sportshost-5b31f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sportshost-5b31f",
  storageBucket: "sportshost-5b31f.appspot.com",
  messagingSenderId: "396205952699",
  appId: "1:396205952699:web:d2baf30e61d1a02341e39e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app)


const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    onAuthStateChanged(auth, (user) => {
        if(user){
            history.push(`/home`);
        }
    })

    function sub(){
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
                history.push(`/home`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
  });
    }
  

  
  return (
    <IonApp>
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{textAlign: "center"}}>SportsHost</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <IonLabel>Email ID</IonLabel>
             <IonInput placeholder="Email" type='email' onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
        <IonLabel>Password</IonLabel>
          <IonInput placeholder="Password" type='password' onIonChange={(e:any) => setPass(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
            <IonButton onClick={() =>sub()}>Login</IonButton>
        </IonItem>
    </IonList>
      </IonContent>
    </IonPage>
    </IonApp>
  );
};

export default Login;
