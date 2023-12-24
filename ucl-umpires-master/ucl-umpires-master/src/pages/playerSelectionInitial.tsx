import { IonApp, IonRouterOutlet,IonLabel, IonButton, IonRadio, IonRadioGroup, setupIonicReact, IonRippleEffect, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router-dom';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

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

interface UserDetailPageProps
extends RouteComponentProps<{
  id: string;
}> {}
const PlayerSlc: React.FC<UserDetailPageProps> = ({ match }) => {
    const history = useHistory();

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

    const subData = async() => {

        team1Players.forEach(async player => {
            await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Batsmen'),{
                Players: {
                    [player] : {
                        ID: `${team1PlayersID[team1Players.indexOf(player)]}`,
                        Runs: 0,
                        Balls: 0,
                        Fours: 0,
                        Sixes: 0,
                        Status: "onBench"
                    }
                }
            })  
        });

        await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Batsmen'),{
            Players: {
                [striker] : {
                    ID: `${team1PlayersID[team1Players.indexOf(striker)]}`,
                    Runs: 0,
                    Balls: 0,
                    Fours: 0,
                    Sixes: 0,
                    Status: "onStrike"
                  },
                  [nonStriker] : {
                      ID: `${team1PlayersID[team1Players.indexOf(nonStriker)]}`,
                      Runs: 0,
                      Balls: 0,
                      Fours: 0,
                      Sixes: 0,
                      Status: "offStrike"
                  },
            }

            
        }, {merge:true})  

        team2Players.forEach(async player => {
            await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Bowlers'),{
                Players: {
                    [player] : {
                        ID: `${team1PlayersID[team1Players.indexOf(player)]}`,
                        BallsThrown: 0,
                        RunsGiven: 0,
                        Maiden: 0,
                        Wickets : 0,
                        Status: "onField"
                    }
                }
            })  
        })

        await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Bowlers'),{
            Players:{
                [bowler] : {
                    ID: `${team2PlayersID[team2Players.indexOf(bowler)]}`,
                    BallsThrown: 0,
                    RunsGiven: 0,
                    Maiden: 0,
                    Wickets : 0,
                    Status: "Bowling"
                }
            }
        },{merge:true})

        await setDoc(doc(db,`Matches/${matchID}/Inning1`,'TotalData'),{
            Striker:`${striker}`,
            NonStriker:`${nonStriker}`,
            Bowler:`${bowler}`
        }, {merge:true})

        history.push(`/scoring/${matchID}`);
    }

    useEffect(() => {
        var info = match.url.slice(15);
        
        var index = info.indexOf(".");
        var index2 = info.lastIndexOf(".");
        setTeam1(info.substring(0,index));
        setTeam2(info.substring(index+1, index2));
        setID(info.substring(index2+1));

        getData(info.substring(0,index), info.substring(index+1, index2))
        
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
                    <IonItem>
                        <IonLabel position='stacked'>Striker Batsman</IonLabel>
                        <IonSelect placeholder='Player Name' interface='popover' onIonChange={e => setStriker(e.detail.value)}>
                            {team1Players.map(player => (
                                <IonSelectOption key={`${player}.Striker`} value={player}>{player}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Non-Striker Batsman</IonLabel>
                        <IonSelect placeholder='Player Name' interface='popover' onIonChange={e => setNonStriker(e.detail.value)}>
                            {team1Players.map(player => (
                                <IonSelectOption key={`${player}.Non-Striker`} value={player}>{player}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Opening Bowler</IonLabel>
                        <IonSelect placeholder='Player Name' interface='popover' onIonChange={e => setBowler(e.detail.value)}>
                            {team2Players.map(player => (
                                <IonSelectOption key={`${player}.Non-Striker`} value={player}>{player}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                            <IonButton onClick={() => subData()}>Start Match!<IonRippleEffect></IonRippleEffect></IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default PlayerSlc;