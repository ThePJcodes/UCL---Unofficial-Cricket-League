import { IonApp, IonRouterOutlet,IonLabel, IonRadio, IonRadioGroup, setupIonicReact, IonRippleEffect, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory  } from 'react-router-dom';
import { IonList, IonItem, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { getDatabase, ref, child, get, onValue, set, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore, loadBundle } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

import App from '../App';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

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
const auth = getAuth(app);


const Home: React.FC = () => {
  const history = useHistory();

  const [team1, setTeam1] = useState("Team 1");
  const [team2, setTeam2] = useState("Team 2");
  const [tossWon, setToss] = useState("");
  const [tossSelect, setTossSlt] = useState("");
  const [tournament, setTour] = useState([""]);
  const [sltTour, setSltTour] = useState("")
  const [index, setIN] = useState({})

  const [teams,SetTeams] = useState([""]);

  async function first(){
    console.log("dd")
    teams.shift();

    var dbRef = ref(database, `Teams`);

    onAuthStateChanged(auth, (user) => {
      if(user){

        onValue(ref(database, `users/${user.uid}/tournaments`), (snap) => {
          tournament.shift();
          let count = 0
          snap.forEach((tour) => {
            setTour(arr => [...arr, tour.val().name])
            Object.assign(index,{[tour.val().name]:Object.keys(snap.val())[count]})
            console.log(Object.keys(snap.val())[count])
            count++
          })

          console.log(index)
        })
      }
    })


    // const docSnap = await getDocs(collection(db, "Teams"));
    // docSnap.forEach(doc => {

    //   teams.shift();
    //   SetTeams(arr => [...arr, doc.id]);
    // });
  }
  function load(sl:any){
    console.log(index)
    console.log(sl)
      onAuthStateChanged(auth, (user) =>{
        if(user){
          // let tourCount = 0;
          //   onValue(ref(database, `users/${user.uid}/tournaments`),(snapshot) =>{
          //       let teamCount = 0;
          //       snapshot.forEach((t) => {
          //           console.log(t.val())
          //           onValue(ref(database, `users/${user.uid}/tournaments/${index[sl as keyof typeof index]}`),(snap) =>{
          //               console.log(`users/${user.uid}/tournaments/${index[sl as keyof typeof index]}/teams/${Object.keys(t.val())[teamCount]}`)
          //               let count = 0;
          //               console.log(snap.val())
          //               snap.forEach((team) => {
          //                 console.log(`users/${user.uid}/tournaments/${index[sl as keyof typeof index]}/teams`)
          //                   onValue(ref(database, `users/${user.uid}/tournaments/${index[sl as keyof typeof index]}/teams`),(s) => {
          //                     teams.shift();
          //                     s.forEach((t) => {
          //                       SetTeams(arr => [...arr, t.val().tname]);
          //                     })
          //                   })
          //                   count++
          //               })
          //           })
          //            teamCount++
          //       })
          //       tourCount++
          //   })

          onValue(ref(database, `users/${user.uid}/tournaments/${index[sl as keyof typeof index]}/teams`), (snap) =>{
            teams.shift();
            snap.forEach((team) => {
              SetTeams(arr => [...arr, team.val().tname]);
            })
          })
        }
      })
    }
  async function sub() {

    // set(ref(database,"CurrMatch"),{
    //   State:"Inning1",
    //     Team1:`${team1}`,
    //     Team2:`${team2}`,
    //     TossWon: `${tossWon}`,
    //     TossTeamSelected: `${tossSelect}`,
    //     Timestamp: Date.now()*-1,
    //     Inning1 : {}
    // })

    // const docRef = await addDoc(collection(db, 'Matches'),{
    //     State:"Inning1",
    //     Team1:`${team1}`,
    //     Team2:`${team2}`,
    //     TossWon: `${tossWon}`,
    //     TossTeamSelected: `${tossSelect}`,
    //     Timestamp: Date.now()*-1
    // })

    // await setDoc(doc(db,`Matches/${docRef.id}/Inning1`,'Overs'),{
    //       Over1:{
    //         Ball1:{
              
    //         }
    //       }
    // })
//     await setDoc(doc(db,`Matches/${docRef.id}/Inning1`,'Batsmen'),{
//       Player1 : {
        
//       }
//   })

//   await setDoc(doc(db,`Matches/${docRef.id}/Inning1`,'Bowlers'),{
//     Player1 : {
      
//     }
    
// })

// await setDoc(doc(db,`Matches/${docRef.id}/Inning1`,'TotalData'),{
  
//   Runs:0,
//   // Extra:{
//   //   Byes:0,
//   //   LegByes:0,
//   //   Wide:0,
//   //   NoBalls:0,
//   //   Penalty:0
//   // },

//   Overs:{
//     Over:0,
//     Ball:0
//   },
//   Wickets:0,
//   // Striker:'',
//   // NonStriker:'',
//   // Bowler:''
// })



  let t1ID = ""    
  let t2ID = ""    

    onAuthStateChanged(auth, (user) =>{
      if(user){

        update(ref(database,`users/${user.uid}/tournaments/${index[sltTour as keyof typeof index]}/CurrMatch`),{
          Inning1: {
            Runs:0,
            Overs:{
              Over:0,
              Ball:0
            },
            Wickets:0
          },
          State:"Inning1"
          })

        onValue(ref(database,`users/${user.uid}/tournaments/${index[sltTour as keyof typeof index]}/teams`),(snap) =>{
          console.log(snap.val())
          snap.forEach((team) =>{
            if(team.val().tname == team1){
              if(team.key){
                 t1ID = team.key
              }
            }else if(team.val().tname == team2){
              if(team.key){
                 t2ID = team.key
              }
            }
          })
        })
      }
      console.log(t2ID)

    if(tossWon == team1){
        if(tossSelect == "Bat"){
            history.push(`/scorer/${t1ID}.${t2ID}.${index[sltTour as keyof typeof index]}`);
        }else{
            history.push(`/scorer/${t2ID}.${t1ID}.${index[sltTour as keyof typeof index]}`);
        }
    }else{
        if(tossSelect == "Bat"){
            history.push(`/scorer/${t2ID}.${t1ID}.${index[sltTour as keyof typeof index]}`);
        }else{
            history.push(`/scorer/${t1ID}.${t2ID}.${index[sltTour as keyof typeof index]}`);
        }
    }
    })
  }

  function log(){
    signOut(auth).then(() =>{
      history.push('/login')
    })
  }

  useEffect(() => {
    first();

    onAuthStateChanged(auth, (user) =>{
      if(user){

      }else{
        history.push('/login')
      }
    })
  }, [])

  
  return (
    <IonApp>
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSelect interface="popover" placeholder="Select Tournament" id = "tour" onIonChange={e => {setSltTour(e.detail.value); load(e.detail.value)}}>
            {tournament.map(name =>(
                  <IonSelectOption key={`${name}`} value={name}>{name}</IonSelectOption>
              ))}
          </IonSelect>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <IonLabel>Team 1:</IonLabel>
          <IonSelect interface="popover" placeholder="Select Team A" id = "team1" onIonChange={e => setTeam1(e.detail.value)}>
            {teams.map(name =>(
                <IonSelectOption key={`${name}.team1`} value={name}>{name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
        <IonLabel>Team 2:</IonLabel>
          <IonSelect interface="popover" placeholder="Select Team B" id = "team2" onIonChange={e => setTeam2(e.detail.value)}>
            {teams.map(name =>(
                  <IonSelectOption key={`${name}.team2`} value={name}>{name}</IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonItem>
        <IonLabel>First to Play:</IonLabel>
          <IonSelect interface='popover' placeholder='The toss was won by?' onIonChange={e=>setToss(e.detail.value)}>
            <IonSelectOption>{team1}</IonSelectOption>
            <IonSelectOption>{team2}</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
        <IonLabel>And Chose to:</IonLabel>
          <IonList>
            <IonRadioGroup onIonChange={e=>setTossSlt(e.detail.value)}>
              <IonItem>
                <IonLabel>Start</IonLabel>
                <IonRadio slot="end" value="Bat"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>Side</IonLabel>
                <IonRadio slot="end" value="Ball"></IonRadio>
              </IonItem>
              </IonRadioGroup>
          </IonList>
        </IonItem>
    </IonList>
    <div className="wrapper">
      <div className="ion-activatable ripple-parent custom-parent"  onClick={ () => sub() }>
        <IonButton>Start Match
        <IonRippleEffect></IonRippleEffect></IonButton>
      </div>
    </div>

    <IonButton onClick={() =>log()}>LogOut<IonRippleEffect></IonRippleEffect></IonButton>
      </IonContent>
    </IonPage>
    </IonApp>
  );
};

export default Home;
