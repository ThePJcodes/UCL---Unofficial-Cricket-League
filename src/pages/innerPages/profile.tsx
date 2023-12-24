import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet, IonButton} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getAuth,  onAuthStateChanged, signOut } from "firebase/auth";
import {
  home,
  person,
  baseball,
  calendar
} from 'ionicons/icons';



import './teams.scss'
import { userInfo } from 'os';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
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

const Profile: React.FC= () => {

  const history = useHistory();

    const [name, SetName] = useState("Loading");
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
           loadData(user);
          // ...
        } else {
          // User is signed out
          history.push('/login');
          // ...
        }
      }); 
    }, [])

      const loadData = async(user:any) => {

        const querySnapshot = await getDocs(collection(db, "Users"));
              querySnapshot.forEach((doc) => {
                  if(doc.id == user.uid){
                     SetName(`${doc.data().Name}`)
                  }
                });
      
      }

    return(
        <IonPage>
          <IonContent>
          <IonText>{name}</IonText>
            <IonButton onClick={() => signOut(auth)} routerLink = '/login'>Sign Out!</IonButton>
          </IonContent>
          <IonFooter>
         <IonToolbar>
           <IonSegment value="all">
              <IonCard>
              <IonSegmentButton className='tbut'>
                <IonIcon icon = {calendar}></IonIcon>
                  PlayerBoard
                </IonSegmentButton>
              </IonCard>
              <IonCard routerLink='/home'>
              <IonSegmentButton value="fav">
                <IonIcon icon = {home}></IonIcon>
                Home
              </IonSegmentButton>
              </IonCard>

             <IonCard routerLink='/profile'>
              <IonSegmentButton value="all">
              <IonIcon icon = {person}></IonIcon>
                Profile
              </IonSegmentButton>
             </IonCard>
           </IonSegment>
           </IonToolbar>
       </IonFooter>
        </IonPage>
    )
}

export default Profile;