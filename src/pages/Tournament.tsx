import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList} from '@ionic/react';
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
import Tab1 from './Tab1';
import './Tourney.scss'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"; 
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
async function start() {
  const querySnapshot = await getDocs(collection(db, "Teams"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const text = document.createElement('IonText');
    text.innerHTML = `doc.data()`;
    document.getElementsByClassName("cards")[0].appendChild(text);
  });
  console.log("once");
}

// const unsub = onSnapshot(doc(db, "Teams"), (doc) => {
//   var temp = doc.data();
//   var text = document.getElementById("CSD Daredevils");
//   if(text && temp){
//     text.innerHTML = temp[0];
//   console.log("Current data: ", temp[0]);
//   }
// });

const Tournament: React.FC = () => {
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
          <IonTitle>Tournament Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          <IonCard class = "cards">
            <IonCardHeader class = "cardTitle">Fixtures</IonCardHeader>
          </IonCard>
          <IonCard class = "cards">
            <IonCardHeader class = "cardTitle">Points Table</IonCardHeader>
          </IonCard>
          <IonCard class = "cards">
            <IonCardHeader class = "cardTitle">Teams</IonCardHeader>
          </IonCard>
        </IonList>

        <IonText id='team'></IonText>
      </IonContent>
    </IonPage>
  );
};

//start();
export default Tournament;
