import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter,} from '@ionic/react';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc } from "firebase/firestore"; 
import { debug } from 'console';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDqxx0bAtxF8AgbwgPof8zuRpCg5fjW5M",
  authDomain: "website-7a5a3.firebaseapp.com",
  projectId: "website-7a5a3",
  storageBucket: "website-7a5a3.appspot.com",
  messagingSenderId: "345087588437",
  appId: "1:345087588437:web:701887029db0d518283cdc",
  measurementId: "G-DZ5V6G1Y0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Page: React.FC = () => {
  console.log("qq");


  async function first(){
    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
    const docSnap = await getDocs(collection(db, "teams"));
    docSnap.forEach(doc => {
     let p = document.createElement("ion-select-option");
      p.innerHTML = doc.id;
      p.value = doc.id;
      console.log(p);
      const drop = document.getElementById('team1');
      if(drop){
        drop.appendChild(p);
      }
    });
  }
  useIonViewDidEnter(() => {
    first();
    console.log("qq");
  });

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{textAlign: "center"}}>UCL Umpires</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
      <IonItem>
        <IonSelect interface="popover" placeholder="Select Team A" id = "team1">
          {/* <IonSelectOption value="apples">Apples</IonSelectOption>
          <IonSelectOption value="oranges">Oranges</IonSelectOption>
          <IonSelectOption value="bananas">Bananas</IonSelectOption> */}
        </IonSelect>
      </IonItem>
    </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
