import { IonApp, IonRouterOutlet,IonLabel,IonButton, useIonAlert ,IonFabButton, IonRadio, IonRadioGroup, setupIonicReact, IonRippleEffect, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, IonCard, IonCardHeader, IonCardContent, IonCheckbox, IonFooter, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router-dom';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue, set, push, update } from "firebase/database";

import './scorer.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDvjB17tbBDuypmNzLWwjHLHjSoTNTz1vE",
  authDomain: "sportshost-5b31f.firebaseapp.com",
  databaseURL: "https://sportshost-5b31f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sportshost-5b31f",
  storageBucket: "sportshost-5b31f.appspot.com",
  messagingSenderId: "396205952699",
  appId: "1:396205952699:web:d2baf30e61d1a02341e39e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app)


interface UserDetailPageProps
extends RouteComponentProps<{
  id: string;
}> {}
const PlayerSlc: React.FC<UserDetailPageProps> = ({ match }) => {
    const history = useHistory();

    const [presentAlert] = useIonAlert();

    const [matchID, setID] = useState("");

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [tossOpt, setTossOpt] = useState("");

    const [team1Players, set1Players] = useState([""]);
    const [team1PlayersID, set1pID] = useState([""]);
    const [team2Players, set2Players] = useState([""]);
    const [team2PlayersID, set2pID] = useState([""]);

    const [striker, setStriker] = useState("");
    const [nonStriker, setNonStriker] = useState("");
    const [bowler, setBowler] = useState("");

    const [inning, setInning] = useState("Inning1")
    const [runs, setRuns] = useState(0);
    const [wickets, setWickets] = useState(0);
    var wicket = false
    const [balls, setBalls] = useState(0);
    const [overs, setOvers] = useState(0);
    var extra = false;
    const [target, setTarget] = useState(0);

    const [t1goals, setT1] = useState(0);
    const [t2goals, setT2] = useState(0);

    const [tour, setTour] = useState("");

    const getData = async(t1:string, t2:string) => {
        const team1Path = `Teams/${t1}/Players`
        const team2Path = `Teams/${t2}/Players`
        console.log(t1+" and "+ t2);
        var docRef = await getDocs(collection(db,team1Path));

        docRef.forEach(doc => {
            team1Players.shift();
            set1Players(arr => [...arr, doc.data().Name]);
            team1PlayersID.shift();
            set1pID(arr => [...arr, doc.id]);
        })

        docRef = await getDocs(collection(db,team2Path));

        docRef.forEach(doc => {
            team2Players.shift();
            set2Players(arr => [...arr, doc.data().Name]);
            team2PlayersID.shift();
            set2pID(arr => [...arr, doc.id]);
        })
        

    }

    const end = async () => {
        setInning("Inning2");
        setTarget(runs+1);
        setRuns(0);
        setBalls(0);
        setWickets(0);
        setOvers(0);
        setTeam1(team2);
        setTeam2(team1);
        // await setDoc(doc(db,`Matches/${matchID}`),{
        //     State:"Inning2",
        //     Target: runs+1
        // },{merge:true})

        onAuthStateChanged(auth, (user) => {
            if(user){
                update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch`),{
                    State:"Inning2",
                    Target: runs+1
                })
            }
        })

    }

    const win = async () => {
        onAuthStateChanged(auth, (user) => {
            if(user){

        update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch`),{
            State:"Finished",
            Winners: team1
        })
    }})

        const matchKey = push(child(ref(database), 'Matches')).key;
        

        let MatchData = {}

        onAuthStateChanged(auth, (user) =>{
            if(user){
                onValue(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch`), (snap)=>{
                    MatchData = snap.val()
                    console.log(MatchData);
                })

                 const Data = MatchData;

                    set(ref(database,`users/${user.uid}/tournaments/${tour}/Matches`), Data).then(()=>{
                        console.log("done")
                    });
            }
        })

        // await setDoc(doc(db,`Matches/${matchID}`),{
        //     State:"Finished",
        //     Winners: team1
        // },{merge:true})

        presentAlert({
            header: 'Win!',
            subHeader: `${team1} have won the match!`,
            message: 'Now the match will end',
            buttons: ['OK'],
          }).then(()=>{ history.push(`/home`);})
          history.push(`/home`);
        console.log("wga")
    }

    const lose = async () => {
        // await setDoc(doc(db,`Matches/${matchID}`),{
        //     State:"Finished",
        //     Winners: team2
        // },{merge:true})

        
        onAuthStateChanged(auth, (user) =>{
            if(user){

        update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch`),{
            State:"Finished",
            Winners: team2
        })
    }})

        presentAlert({
            header: 'Win!',
            subHeader: `${team2} have won the match!`,
            message: 'Now the match will end',
            buttons: ['OK'],
          });
        history.push(`/home`);
        console.log("wga")
    }

    const subData = async(run:any) => {
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setRuns(runs+run);
        if(target != 0){
            if(runs+run>target  && inning == "Inning2"){
                win();
            }
        }
        if(!extra){
            setBalls(balls+1);
            console.log("sd");
            update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch/${inning}/Overs`),{
                Ball: balls+1,
            })
            // await setDoc(doc(db,`Matches/${matchID}/${inning}/TotalData`),{
            //     Overs:{
            //         Ball: balls+1,
            //     },
            // },{merge:true});
            if(balls == 5){
                setBalls(0);
                setOvers(overs+1);
                if(overs+1 > 9  && inning == "Inning2"){
                    lose();
                }
                update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch/${inning}/Overs`),{
                    Ball: 0,
                    Over: overs+1
                })
                // await setDoc(doc(db,`Matches/${matchID}/${inning}/TotalData`),{
                //     Overs:{
                //         Ball: 0,
                //         Over: overs+1,
                //     },
                // },{merge:true});
            }
        }else{
            extra = false
            document.getElementById('extraCheck')?.setAttribute('checked', 'false');
        }

        if(wicket){
            setWickets(wickets+1);
            if(wickets+1 == 10 && inning == "Inning2"){
                lose();
            }
            wicket = false;
            document.getElementById('wicketCheck')?.setAttribute('checked', 'false');
            update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch/${inning}`),{
                Wickets: wickets+1  
            })
            // await setDoc(doc(db,`Matches/${matchID}/${inning}/TotalData`),{
            //     Wickets: wickets+1
            // },{merge:true});
        }

        update(ref(database, `users/${user.uid}/tournaments/${tour}/CurrMatch/${inning}`),{
            Runs: runs+run,
        })

        // await setDoc(doc(db,`Matches/${matchID}/${inning}/TotalData`),{
        //     Runs: runs+run,
        // },{merge:true})
            }})
    }

    useEffect(() => {
        var info = match.url.slice(8);
        console.log(match.url);
        var index = info.indexOf(".");
        console.log(index);
        setTeam1(info.substring(0,index));
        var index2 = info.substring(index+1).indexOf(".")
        console.log(index + " " + index2)
        setTeam2(info.substring(index+1,index2+1));
        setTour(info.substring(index+1).substring(index2+1))

        onAuthStateChanged(auth, (user) =>{
            if(user){
                onValue(ref(database, `users/${user.uid}/tournaments/${info.substring(index+1).substring(index2+1)}/teams/${info.substring(0,index)}`), (snap)=>{
                    setTeam1(snap.val().tname)
                })

                onValue(ref(database, `users/${user.uid}/tournaments/${info.substring(index+1).substring(index2+1)}/teams/${info.substring(index+1,index+index2+1)}`), (snap)=>{
                    console.log(`users/${user.uid}/tournaments/${info.substring(index+1).substring(index2+1)}/teams/${info.substring(index+1,index+index2+1)}`)
                    setTeam2(snap.val().tname)
                })
            }
        })
        
      }, [])


    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{textAlign: "center"}}>{team1} v/s {team2}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonCard>
                        <IonCardHeader><div style={{display:'flex', justifyContent:'space-between'}}><div>{team1}, {inning}</div><div id="targ">Target:{target}</div></div></IonCardHeader>
                        <IonCardContent id="scoreCard">
                            <IonText class = "upper">{runs}/{wickets}</IonText>
                            <IonText class='lower'>{overs}.{balls}</IonText>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardContent id="scoreButtons">
                            <IonFabButton onClick={() =>{subData(0)}}>0</IonFabButton>
                            <IonFabButton onClick={() =>{subData(1)}}>1</IonFabButton>
                            <IonFabButton onClick={() =>{subData(2)}}>2</IonFabButton>
                            <IonFabButton onClick={() =>{subData(3)}}>3</IonFabButton>
                            <IonFabButton onClick={() =>{subData(4)}}>4</IonFabButton>
                            <IonFabButton onClick={() =>{subData(5)}}>5</IonFabButton>
                            <IonFabButton onClick={() =>{subData(6)}}>6</IonFabButton>
                            <IonFabButton onClick={() =>{subData(7)}}>7</IonFabButton>
                            <IonFabButton onClick={() =>{subData(8)}}>8</IonFabButton>
                            <div id="wicketLabel">
                                <IonCheckbox id='wicketCheck' onIonChange={() => {wicket = true}}></IonCheckbox>
                                <IonLabel>Wicket</IonLabel>
                            </div>
                            <div id="wicketLabel">
                                <IonCheckbox id='extraCheck' onIonChange={()=>{extra = true}}></IonCheckbox>
                                <IonLabel>Extra</IonLabel>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonList>
            </IonContent>

            {/* <IonContent>
                <IonLabel>
                    <IonItem>
                        <div style={{display:'flex', alignContent:'space-around', width:"100%", justifyContent:"space-between"}}>
                            <div>{team1}</div>
                            <div>{team2}</div>
                        </div>
                    </IonItem>
                    <IonItem>
                        <div style={{display:'flex', alignContent:'space-around', width:"100%", justifyContent:"space-between"}}>
                                <div>{t1goals}</div>
                                <div>{t2goals}</div>
                            </div>
                    </IonItem>
                    <IonItem>
                    <div style={{display:'flex', alignContent:'space-around', width:"100%", justifyContent:"space-between"}}>
                                <IonFabButton onClick={() =>{setT1(t1goals+1)}}>+</IonFabButton>
                                <IonFabButton onClick={() =>{setT2(t2goals+1)}}>+</IonFabButton>
                            </div>
                    </IonItem>
                </IonLabel>
            </IonContent> */}

            <IonFooter>
                    <IonButton onClick={()=>{end()}}>End Match</IonButton>
                </IonFooter>
        </IonPage>
    );
};

export default PlayerSlc;