import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet, IonLabel, IonInput, IonButton} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';


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

const Datain: React.FC = () => {

    const [name, setName] = useState("");

    const [teams, setTeams] = useState([""]);
    const [team, setTeam] = useState("Admins");

    var TeamName = 'Testers'

    async function sendData() {
        // const docRef = await addDoc(collection(db, 'Teams', TeamName, 'Players'),{
        //     BallsFaced: 0,
        //     BallsThrown: 0,
        //     Branch: 'Admins',
        //     Fifties: 0,
        //     FiveWickets: 0,
        //     Fours: 0,
        //     Matches: [],
        //     Name: `${name}`,
        //     Outs: 0,
        //     RunsGiven: 0,
        //     RunsScored: 0,
        //     Sixes: 0,
        //     Team: `${TeamName}`,
        //     Wickets: 0
        // })

        // const docRef = await setDoc(doc(db, 'Teams', team),{
        //     Points: 0,
        //     Wins: 0,
        //     Draws: 0,
        //     Played: 0,
        //     NRR: 0
            
        // },{merge:true})

    }

   const loadData = async () => {
    console.log("s")
        // const querySnapshot = await getDocs(collection(db, "Teams"));
        // setTeams([""]);
        // querySnapshot.forEach((doc) => {
        //     teams.shift();
        //     setTeams(arr => [...arr, `${doc.id}`] );
        // });

        console.log("ws")
   }

    useEffect(() => {
        loadData()
    });    

    return(
        <IonPage>
            <IonContent>
                <IonList>
                    <IonSelect onIonChange={(e) =>{setTeam(e.detail.value)}}>
                        {teams.map(team =>(
                            <IonSelectOption key={team}>{team}</IonSelectOption>
                        ))}
                    </IonSelect>
                    <IonItem>
                            <IonLabel position='stacked'>Name</IonLabel>
                                <IonInput placeholder='naam bhai naam'onIonBlur={(e:any) => setName(e.target.value)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton onClick={()=>sendData()}>Sumbit</IonButton>
            </IonContent>
        </IonPage>
    )

}

export default Datain;