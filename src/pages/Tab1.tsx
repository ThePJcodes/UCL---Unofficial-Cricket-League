import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, } from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import './Tab1.css';
import {
  home,
  person,
  baseball,
  calendar
} from 'ionicons/icons';

import Tab3 from './Login';
import Tab2 from './Home';
import Tournament from './Tournament';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBDqxx0bAtxF8AgbwgPof8zuRpCg5fjW5M",
//   authDomain: "website-7a5a3.firebaseapp.com",
//   projectId: "website-7a5a3",
//   storageBucket: "website-7a5a3.appspot.com",
//   messagingSenderId: "345087588437",
//   appId: "1:345087588437:web:701887029db0d518283cdc",
//   measurementId: "G-DZ5V6G1Y0L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const unsub = onSnapshot(doc(db, "util-variables", "Match 1"), (doc) => {
//   var temp = doc.data();
//   var text = document.getElementById("team");
//   if(text && temp){
//     text.innerHTML = temp.Team2;
//   console.log("Current data: ", temp.Team2);
//   }
// });

const Tab1: React.FC = () => {
  const a = ((baseEl: any, opts?: any) => { 
    console.log("opts.enteringEl:"  + opts.enteringEl); //Entering Element - New Page
    console.log("opts.leavingEl:"  + opts.leavingEl);   //Leaving Element - Current Page
    var anim1 = createAnimation()
      .addElement(opts.leavingEl)
      .duration(2000)
      .iterations(1)
      .easing('ease-out')
      .fromTo('transform', 'translateX(0px)', 'translateX(2000px)')
    var anim2 = createAnimation()
      .addElement(opts.enteringEl)
      .duration(200)
      .iterations(1)
      .easing('ease-out')
      .fromTo('opacity', '0.0', '1')
     var anim2 = createAnimation()
      .duration(2000)
      .iterations(1)
      .addAnimation([anim1, anim2]);
    return anim2;
});

  
const b = ((baseEl: any, opts?: any) => { 
    console.log("opts.enteringEl:"  + opts.enteringEl); //Entering Element - New Page
    console.log("opts.leavingEl:"  + opts.leavingEl);   //Leaving Element - Current Page
    var anim1 = createAnimation()
      .addElement(opts.leavingEl)
      .duration(2000)
      .iterations(1)
      .easing('ease-out')
      .fromTo('transform', 'translateX(0px)', 'translateX(-2000px)')
    var anim2 = createAnimation()
      .addElement(opts.enteringEl)
      .duration(200)
      .iterations(1)
      .easing('ease-out')
      .fromTo('opacity', '0.0', '1')
    var anim2 = createAnimation()
      .duration(2000)
      .iterations(1)
      .addAnimation([anim1, anim2]);
    return anim2;
  });
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle>Match Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonText id='team'></IonText>
      </IonContent>
      <IonFooter>
         <IonToolbar>
           <IonSegment value="all">
           <IonNavLink routerDirection="forward" routerAnimation={b} component={() => <Tournament />}>
              <IonSegmentButton className='tbut'>
                <IonIcon icon = {baseball}></IonIcon>
                  Tournament
                </IonSegmentButton>
              </IonNavLink>
              <IonNavLink routerDirection="forward" routerAnimation={b} component={() => <Tab1 />}>
              <IonSegmentButton className='tbut'  value="all">
                <IonIcon icon = {calendar}></IonIcon>
                  PlayerBoard
                </IonSegmentButton>
              </IonNavLink>
            <IonNavLink routerDirection="forward" routerAnimation={b} component={() => <Tab2 />}>
             <IonSegmentButton>
              <IonIcon icon = {home}></IonIcon>
              Home
             </IonSegmentButton>
             </IonNavLink>
             <IonNavLink routerDirection="forward" routerAnimation={a} component={() => <Tab3 />}>
              <IonSegmentButton value="favorites">
              <IonIcon icon = {person}></IonIcon>
                Profile
              </IonSegmentButton>
             </IonNavLink>
           </IonSegment>
           </IonToolbar>
       </IonFooter>
    </IonPage>
  );
};

export default Tab1;
