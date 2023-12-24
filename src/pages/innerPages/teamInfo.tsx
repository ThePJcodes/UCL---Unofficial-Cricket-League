import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, getDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { getDatabase, ref, child, get, onValue } from "firebase/database";


import './fixtures.scss'

import PlayerInfo from './PlayerProfile';
import { pid } from 'process';

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
  const database = getDatabase(app);


  interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const TeamsInfo: React.FC<UserDetailPageProps> = ({ match }) => {
  const history = useHistory();
  

    const [names, setName] = useState(["Individual Player Profiles Coming Soon!"]);
    const [pId, setId] = useState([""]);
    const [index, setIndex] = useState([0]);

    const loadData = async() => {

      var trueRef = ref(database,'PlayerProfiles');

      onValue(trueRef, (snap) =>{
        if(snap.val() == true){
          var dbRef = ref(database, `Teams/${match.params.id}/Players`);

          names.shift();
            onValue(dbRef, (snap) =>{
              for(const name in snap.val()){
                setName(arr => [...arr, `${name}`] );
              }
            })
        }
      })
      
        // const querySnapshot = await getDocs(collection(db, 'Teams', `${match.params.id}`, 'Players'));
        // // const map1 = new Map(Object.entries(querySnapshot.data()?.Players));
        // // console.log(querySnapshot.data());
        // //     map1.forEach((element:any)=> {
        // //         console.log(element);
        // //     });
        //       querySnapshot.forEach((doc) => {
        //         console.log(doc.data().Name);
        //           names.shift();
        //           setName(arr => [...arr, `${doc.data().Name}`] );
        //           pId.shift();
        //           setId(arr => [...arr, `${doc.id}`]);
        //         });
      
      }


      useEffect(() => {
        loadData()
      }, [])

      function change(team:any){

        console.log('/teamInfo/'+`${match.params.id}`+'/player/'+`${team.name}`);
        console.log(`${match.url}/player/:name`);

        history.push(`/playerInfo/${team}.${match.params.id}`);
      
      }
      
    
return(
  <IonPage>
    <IonHeader>
        <IonToolbar>
            <IonButtons slot="start" id = "bckBtn">
                <IonBackButton defaultHref={`/teamInfo`}></IonBackButton>
            </IonButtons>
          <IonTitle>{match.params.id}</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        {names.map((name)=> (
            <IonItem key = {name} class = "teamNames" ><IonCard style={{fontFamily:"Bungee", fontSize:"4vw", width:"100vw", padding:"1vw"}} onClick={()=>change(name)}>{name}</IonCard></IonItem>
          ))}
          </IonContent>
    </IonPage>
)

}

export default TeamsInfo;