import { IonApp, IonRouterOutlet,IonLabel,  IonCheckbox, IonFabButton, IonRippleEffect, IonInput, IonButtons, IonModal,IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, IonCard, IonCardHeader, IonCardContent, IonButton, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { initializeApp } from "firebase/app";
import { arrayUnion, getFirestore, increment } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import { useState, useEffect, useRef } from 'react';
import { State } from 'ionicons/dist/types/stencil-public-runtime';

import './scoring.css'

import { OverlayEventDetail } from '@ionic/core/components';
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


const Scoring: React.FC<UserDetailPageProps> = ({ match }) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [unballCount, setUnballCount] = useState(0);

    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    async function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');

        if(tempBall == 0){
            if(wide){
                let check = document.getElementById('wideCheck');
                check?.setAttribute('checked', 'false');
                setWide(false);

                check = document.getElementById('wicketCheck');
                check?.setAttribute('checked', 'false');
                setOut(false);

                var temp;

                setWickets(wickets+1);
                if(wicketType == "Stumping"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]+1];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                Wickets: increment(1),
                                RunsGiven: increment(1)
                            }
                        }
                    }, {merge:true})

                    docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                        Players:{
                            [striker] : {
                                Status: "Out"
                            },
                            [newBatsmen]:{
                                Status: "Striker"
                            }
                        }
                    },{merge:true})
                    var strikerID = '';
                    var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));

                    dataRef.forEach(player => {
                        if(player.data().Name = striker){
                            strikerID = player.id;
                        }
                    });

                    docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                        [strikerID]:{
                            BallsFaced: P1Details[1],
                            Fours: P1Details[2],
                            RunsScored: P1Details[0],
                            Sixes: P1Details[3],
                            Matches: arrayUnion([team1]+'vs'+[team2])
                        }
                    },{merge:true})

                    if(P1Details[0]>50){
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                            [strikerID]:{
                                Fifties:increment(1)
                            }
                        },{merge:true})
                    }
                    
                    setStriker(newBatsmen);
                    strikerTemp = newBatsmen;
                    var datatemp = [0,0,0,0];
                    SetP1Details(datatemp);
                }else if(wicketType == "Striker Run Out" || wicketType == "Non-Striker Run Out"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                RunsGiven: increment(1)
                            }
                        }
                    }, {merge:true})

                    if(wicketType == "Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [striker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = striker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                BallsFaced: P1Details[1],
                                Fours: P1Details[2],
                                RunsScored: P1Details[0],
                                Sixes: P1Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                        },{merge:true})
    
                        if(P1Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                    Fifties:increment(1)
                            },{merge:true})
                        }
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }else if(wicketType == "Non-Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [nonStriker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = nonStriker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                BallsFaced: P2Details[1],
                                Fours: P2Details[2],
                                RunsScored: P2Details[0],
                                Sixes: P2Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                        },{merge:true})
    
                        if(P2Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                    Fifties:increment(1)
                            },{merge:true})
                        }

                        setNonStriker(striker);
                        nonStrikerTemp = striker;
                        SetP2Details(P1Details);
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }
                }
                setOvers(arr => [...arr, 0]);
                setRuns(runs+1);

                var logo = document.createElement("div");
                var num = document.createElement("div");
                var label = document.createElement("div");
                label.id = 'overLabel';
                label.innerHTML = 'WD';
                logo.className = 'overBalls';
                num.innerHTML = 'OUT';
                num.id = 'numOut';
                logo.appendChild(num);
                logo.appendChild(label);
                document.getElementById('overHolder')?.appendChild(logo);
                setUnballCount(unballCount+1);
                var docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Overs`),{
                    [`Over${currOver+1}`]:{
                            [`unBall${unballCount}`]:{
                                Runs: 0,    
                            }
                    }
                }, {merge:true})
        
                docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/TotalData`),{
                    Extra:{
                        Wide: increment(1)
                    },
                    Runs: increment(1),
                    Wickets: increment(1)
                }, {merge:true})
            }else if(noBall){
                setNoBall(false);
                setOut(false);
                setBye(false);
                setLegBye(false);

                setWickets(wickets+1);
                setRuns(runs+1);

                console.log(wicketType);

                if(wicketType == "Stumping"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]+1];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                Wickets: increment(1),
                                RunsGiven: increment(1)
                            }
                        }
                    }, {merge:true})

                    docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                        Players:{
                            [striker] : {
                                Status: "Out"
                            },
                            [newBatsmen]:{
                                Status: "Striker"
                            }
                        }
                    },{merge:true})
                    var strikerID = '';
                    var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));

                    dataRef.forEach(player => {
                        if(player.data().Name = striker){
                            strikerID = player.id;
                        }
                    });

                    docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                            BallsFaced: P1Details[1],
                            Fours: P1Details[2],
                            RunsScored: P1Details[0],
                            Sixes: P1Details[3],
                            Matches: arrayUnion([team1]+'vs'+[team2])
                    },{merge:true})

                    if(P1Details[0]>50){
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                Fifties:increment(1)
                        },{merge:true})
                    }
                    
                    setStriker(newBatsmen);
                    strikerTemp = newBatsmen;
                    var datatemp = [0,0,0,0];
                    SetP1Details(datatemp);
                }else if(wicketType == "Striker Run Out" || wicketType == "Non-Striker Run Out"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                RunsGiven: increment(1)
                            }
                        }
                    }, {merge:true})

                    if(wicketType == "Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [striker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = striker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                BallsFaced: P1Details[1],
                                Fours: P1Details[2],
                                RunsScored: P1Details[0],
                                Sixes: P1Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                        },{merge:true})
    
                        if(P1Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                    Fifties:increment(1)
                            },{merge:true})
                        }
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }else if(wicketType == "Non-Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [nonStriker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = nonStriker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                BallsFaced: P2Details[1],
                                Fours: P2Details[2],
                                RunsScored: P2Details[0],
                                Sixes: P2Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                        },{merge:true})
    
                        if(P2Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                    Fifties:increment(1)
                            },{merge:true})
                        }

                        setNonStriker(striker);
                        nonStrikerTemp = striker;
                        SetP2Details(P1Details);
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }
                }

                var logo = document.createElement("div");
                var num = document.createElement("div");
                var label = document.createElement("div");
                label.id = 'overLabel';
                label.innerHTML = 'NB';
                logo.className = 'overBalls';
                num.innerHTML = 'OUT';
                num.id = 'numOut';
                logo.appendChild(num);
                logo.appendChild(label);
                document.getElementById('overHolder')?.appendChild(logo);

                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                    Extra:{
                        NoBalls: increment(1)
                    },
                    Runs: increment(1),
                    Wicket: increment(1)
                }, {merge:true})
            }else if(bye){
                if(wicketType == "Striker Run Out" || wicketType == "Non-Striker Run Out"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3], bowlerDetails[4]];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                RunsGiven: increment(0)
                            }
                        }
                    }, {merge:true})

                    if(wicketType == "Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [striker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = striker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                            [strikerID]:{
                                BallsFaced: P1Details[1],
                                Fours: P1Details[2],
                                RunsScored: P1Details[0],
                                Sixes: P1Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                            }
                        },{merge:true})
    
                        if(P1Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                                [strikerID]:{
                                    Fifties:increment(1)
                                }
                            },{merge:true})
                        }
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }else if(wicketType == "Non-Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [nonStriker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = nonStriker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                            [strikerID]:{
                                BallsFaced: P2Details[1],
                                Fours: P2Details[2],
                                RunsScored: P2Details[0],
                                Sixes: P2Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                            }
                        },{merge:true})
    
                        if(P2Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                                [strikerID]:{
                                    Fifties:increment(1)
                                }
                            },{merge:true})
                        }

                        setNonStriker(striker);
                        nonStrikerTemp = striker;
                        SetP2Details(P1Details);
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }
                }

                var logo = document.createElement("div");
                var num = document.createElement("div");
                var label = document.createElement("div");
                label.id = 'overLabel';
                label.innerHTML = 'Bye';
                logo.className = 'overBalls';
                num.innerHTML = 'OUT';
                num.id = 'numOut';
                logo.appendChild(num);
                logo.appendChild(label);
                document.getElementById('overHolder')?.appendChild(logo);

                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                    Extra:{
                        Byes: increment(1)
                    },
                    Wickets: increment(1)
                }, {merge:true})
            }else{
                if(wicketType == "Striker Run Out" || wicketType == "Non-Striker Run Out"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3], bowlerDetails[4]];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                RunsGiven: increment(0)
                            }
                        }
                    }, {merge:true})

                    if(wicketType == "Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [striker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = striker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                            [strikerID]:{
                                BallsFaced: P1Details[1],
                                Fours: P1Details[2],
                                RunsScored: P1Details[0],
                                Sixes: P1Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                            }
                        },{merge:true})
    
                        if(P1Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                                [strikerID]:{
                                    Fifties:increment(1)
                                }
                            },{merge:true})
                        }
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }else if(wicketType == "Non-Striker Run Out"){
                        docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                            Players:{
                                [nonStriker] : {
                                    Status: "Out"
                                },
                                [newBatsmen]:{
                                    Status: "Striker"
                                }
                            }
                        },{merge:true})
                        var strikerID = '';
                        var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));
    
                        dataRef.forEach(player => {
                            if(player.data().Name = nonStriker){
                                strikerID = player.id;
                            }
                        });
    
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                            [strikerID]:{
                                BallsFaced: P2Details[1],
                                Fours: P2Details[2],
                                RunsScored: P2Details[0],
                                Sixes: P2Details[3],
                                Matches: arrayUnion([team1]+'vs'+[team2])
                            }
                        },{merge:true})
    
                        if(P2Details[0]>50){
                            docRef = await setDoc(doc(db,`Teams/${team1}/Players`),{
                                [strikerID]:{
                                    Fifties:increment(1)
                                }
                            },{merge:true})
                        }

                        setNonStriker(striker);
                        nonStrikerTemp = striker;
                        SetP2Details(P1Details);
                        
                        setStriker(newBatsmen);
                        strikerTemp = newBatsmen;
                        var datatemp = [0,0,0,0];
                        SetP1Details(datatemp);
                    }
                }else if(wicketType == "Stumping" || wicketType == "Hit Wicket" || wicketType == "Bowled"){
                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3], bowlerDetails[4]+1];
                    setBDetails(temp);
                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/${inning}/Bowlers/`),{
                        Players:{
                            [`${bowler}`]: {
                                Wickets: increment(1),
                            }
                        }
                    }, {merge:true})

                    docRef = await setDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`),{
                        Players:{
                            [striker] : {
                                Status: "Out"
                            },
                            [newBatsmen]:{
                                Status: "Striker"
                            }
                        }
                    },{merge:true})
                    var strikerID = '';
                    var dataRef = await getDocs(collection(db,`Teams/${team1}/Players/`));

                    dataRef.forEach(player => {
                        if(player.data().Name = striker){
                            strikerID = player.id;
                        }
                    });

                    docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                            BallsFaced: P1Details[1],
                            Fours: P1Details[2],
                            RunsScored: P1Details[0],
                            Sixes: P1Details[3],
                            Matches: arrayUnion([team1]+'vs'+[team2])
                    },{merge:true})

                    if(P1Details[0]>50){
                        docRef = await setDoc(doc(db,`Teams/${team1}/Players/${strikerID}`),{
                                Fifties:increment(1)
                        },{merge:true})
                    }
                    
                    setStriker(newBatsmen);
                    strikerTemp = newBatsmen;
                    var datatemp = [0,0,0,0];
                    SetP1Details(datatemp);
                }

                var logo = document.createElement("div");
                var num = document.createElement("div");
                logo.className = 'overBalls';
                num.innerHTML = 'OUT';
                num.id = 'numOut';
                logo.appendChild(num);
                document.getElementById('overHolder')?.appendChild(logo);

                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                    Wickets: increment(1)
                }, {merge:true})
            }
        }

    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
        setMessage(`Hello, ${ev.detail.data}!`);
        }else{
            let check = document.getElementById('wideCheck');
            check?.setAttribute('checked', 'false');
            setWide(false);

            check = document.getElementById('wicketCheck');
            check?.setAttribute('checked', 'false');
            setOut(false);
        }

        setWicketModal(false);
    }


    const [matchID, setID] = useState("");

    const [inning, setInning] = useState("");

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
  
    const [oversInfo, setOvers] = useState([0]);

    const [batsmenAvalible, setAvailiableBatsmen] = useState([""]);
    const [team2Players, set2Players] = useState([""]);

    const [striker, setStriker] = useState("");
    let strikerTemp = "";
    const [nonStriker, setNonStriker] = useState("");
    var nonStrikerTemp;
    const [bowler, setBowler] = useState("");
    var bowlerTemp;

    const [newBatsmen,setNewBatsmen] = useState("");
    var newBatsmenTemp;

    const [P1Details, SetP1Details] = useState([0]);
    const [P2Details, SetP2Details] = useState([0]);
    const [bowlerDetails, setBDetails] = useState([0]);

    const [runs, setRuns] = useState(0);
    const [currBall, setcurrBall] = useState(0);
    const [currOver, setcurrOver] = useState(0);
    var overTemp = 0;
    const [wickets, setWickets] = useState(0);

    const [wide, setWide] = useState(false);
    const [noBall, setNoBall] = useState(false);
    const [out, setOut] = useState(false);
    const [bye, setBye] = useState(false);
    const [legBye, setLegBye] = useState(false);
    const [tempBall, setTempBall] = useState(0);

    const [wicketModal, setWicketModal] = useState(false);
    const[wicketType, setWicketType] = useState("");

    const getData = async(id:string) => {
        var docRef = await getDoc(doc(db,`Matches/${id}`));

        if(docRef.data()?.TossWon == docRef.data()?.Team1){
            if(docRef.data()?.TossTeamSelected == "Bat"){
                setTeam1(`${docRef.data()?.Team1}`);
                setTeam2(`${docRef.data()?.Team2}`);
            }else{
                setTeam1(`${docRef.data()?.Team2}`);
                setTeam2(`${docRef.data()?.Team1}`);
            }
        }else{
            if(docRef.data()?.TossTeamSelected == "Bat"){
                setTeam1(`${docRef.data()?.Team2}`);
                setTeam2(`${docRef.data()?.Team1}`);
            }else{
                setTeam1(`${docRef.data()?.Team1}`);
                setTeam2(`${docRef.data()?.Team2}`);
            }
        }
        setInning(`${docRef.data()?.State}`);

        if(`${docRef.data()?.State}` == "Inning1"){
            var dataRef = await getDoc(doc(db,`Matches/${id}/Inning1/TotalData`));

                    setRuns(dataRef.data()?.Runs);
                    setWickets(dataRef.data()?.Wickets);
                    setcurrBall(dataRef.data()?.Overs.Ball);
                    setcurrOver(dataRef.data()?.Overs.Over);
                    overTemp = dataRef.data()?.Overs.Over
                    setStriker(dataRef.data()?.Striker);
                    strikerTemp = dataRef.data()?.Striker;
                    setNonStriker(dataRef.data()?.NonStriker);
                    nonStrikerTemp = dataRef.data()?.NonStriker
                    setBowler(dataRef.data()?.Bowler);
                    bowlerTemp = dataRef.data()?.Bowler

                dataRef = await getDoc(doc(db,`Matches/${id}/Inning1/Batsmen`));

                    SetP1Details([dataRef.data()?.Players?.[strikerTemp]?.Runs,dataRef.data()?.Players?.[strikerTemp]?.Balls,dataRef.data()?.Players?.[strikerTemp]?.Fours,dataRef.data()?.Players?.[strikerTemp]?.Sixes]);
                    SetP2Details([dataRef.data()?.Players?.[nonStrikerTemp]?.Runs,dataRef.data()?.Players?.[nonStrikerTemp]?.Balls,dataRef.data()?.Players?.[nonStrikerTemp]?.Fours,dataRef.data()?.Players?.[nonStrikerTemp]?.Sixes]);
                   
                dataRef = await getDoc(doc(db,`Matches/${id}/Inning1/Bowlers`));

                    setBDetails([Math.floor(dataRef.data()?.Players?.[bowlerTemp]?.BallsThrown/6),dataRef.data()?.Players?.[bowlerTemp]?.BallsThrown%6,dataRef.data()?.Players?.[bowlerTemp]?.Maiden,dataRef.data()?.Players?.[bowlerTemp]?.RunsGiven,dataRef.data()?.Players?.[bowlerTemp]?.Wickets]);

                dataRef = await getDoc(doc(db,`Matches/${id}/Inning1/Overs`));

                oversInfo.push();
                Object.keys(dataRef.data()?.[`Over${overTemp+1}`]).forEach(ball => {
                    setOvers(arr => [...arr, dataRef.data()?.[`Over${overTemp+1}`][ball].Runs])
                });
        }

    }

    async function wicketTypeSet(type:string) {
        if(type == "Catch Out"){
            setWicketType("Catch Out");

            var item = document.getElementById("wicketSlot1");
            var label = document.createElement("ion-label");
            var options = document.createElement("ion-select");
            
            var dataRef = await getDoc(doc(db,`Matches/${match.params.id}/${inning}/Bowlers`));

            Object.keys(dataRef.data()?.Players).forEach(player => {
                if(dataRef.data()?.Players?.[player].Status == "onField"){
                    var optionsSlt = document.createElement("ion-select-option");
                    optionsSlt.setAttribute("key",Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]);
                    optionsSlt.innerHTML = Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)];
                    options.appendChild(optionsSlt);
                }
            })

            if(label){
                label.innerHTML = "Who Caught the ball?";
                item?.appendChild(label);
            }

            item?.appendChild(options);
        }else if(type == "Striker Run Out"){
            setWicketType("Striker Run Out");

            var item = document.getElementById("wicketSlot1");
            var label = document.createElement("ion-label");
            var options = document.createElement("ion-select");
            
            var dataRef = await getDoc(doc(db,`Matches/${match.params.id}/${inning}/Bowlers`));

            Object.keys(dataRef.data()?.Players).forEach(player => {
                if(dataRef.data()?.Players?.[player].Status == "onField"){
                    var optionsSlt = document.createElement("ion-select-option");
                    optionsSlt.setAttribute("key",Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]);
                    optionsSlt.innerHTML = Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)];
                    options.appendChild(optionsSlt);
                }
            })

            if(label){
                label.innerHTML = "Who helped?";
                item?.appendChild(label);
            }

            item?.appendChild(options);
        }else if(type == "Non-Striker Run Out"){
            setWicketType("Non-Striker Run Out");

            var item = document.getElementById("wicketSlot1");
            var label = document.createElement("ion-label");
            var options = document.createElement("ion-select");
            
            var dataRef = await getDoc(doc(db,`Matches/${match.params.id}/${inning}/Bowlers`));

            Object.keys(dataRef.data()?.Players).forEach(player => {
                if(dataRef.data()?.Players?.[player].Status == "onField"){
                    var optionsSlt = document.createElement("ion-select-option");
                    optionsSlt.setAttribute("key",Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]);
                    optionsSlt.innerHTML = Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)];
                    options.appendChild(optionsSlt);
                }
            })

            if(label){
                label.innerHTML = "Who helped?";
                item?.appendChild(label);
            }

            item?.appendChild(options);
        }else if(type == "Stumping"){
            setWicketType("Stumping");

            var item = document.getElementById("wicketSlot1");
            var label = document.createElement("ion-label");
            var options = document.createElement("ion-select");
            
            var dataRef = await getDoc(doc(db,`Matches/${match.params.id}/${inning}/Bowlers`));

            Object.keys(dataRef.data()?.Players).forEach(player => {
                if(dataRef.data()?.Players?.[player].Status == "onField"){
                    var optionsSlt = document.createElement("ion-select-option");
                    optionsSlt.setAttribute("key",Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]);
                    optionsSlt.innerHTML = Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)];
                    options.appendChild(optionsSlt);
                }
            })

            if(label){
                label.innerHTML = "Who helped?";
                item?.appendChild(label);
            }

            item?.appendChild(options);
        }
    }

    async function fetchBatsmen() {
        var dataRef = await getDoc(doc(db,`Matches/${match.params.id}/${inning}/Batsmen`));
        console.log(`Matches/${match.params.id}/${inning}/Batsmen`,"Players");

        console.log(dataRef.data()?.Players);

        setAvailiableBatsmen([]);

        Object.keys(dataRef.data()?.Players).forEach(player => {
            if(dataRef.data()?.Players?.[player].Status == "onBench"){
                console.log(Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]);
                setAvailiableBatsmen(arr => [...arr, Object.keys(dataRef.data()?.Players)[Object.keys(dataRef.data()?.Players).indexOf(player)]]);
            }
        })
    }

    async function zero(){
        setTempBall(0);
        if(wide){
            if(out){
                setWicketModal(true);
            }else{
                let check = document.getElementById('wideCheck');
                check?.setAttribute('checked', 'false');
                setWide(false);

                setRuns(runs+1);

                temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                setBDetails(temp);
                setOvers(arr => [...arr, 0]);

                var logo = document.createElement("div");
                var num = document.createElement("div");
                var label = document.createElement("div");
                label.id = 'overLabel';
                label.innerHTML = 'WD';
                logo.className = 'overBalls';
                num.innerHTML = '0';
                num.id = 'num0';
                logo.appendChild(num);
                logo.appendChild(label);
                document.getElementById('overHolder')?.appendChild(logo);

                var docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Overs`),{
                    [`Over${currOver+1}`]:{
                            [`Ball${currBall+1}`]:{
                                Runs: 0,
                                Wide: true,
                            }
                    }
                }, {merge:true})
        
                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                    Extra:{
                        Wide: increment(1)
                    },
                    Runs: increment(1)
                }, {merge:true})
        
                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Bowlers/`),{
                    Players:{
                        [`${bowler}`]: {
                            RunsGiven: increment(1)
                        }
                    }
                }, {merge:true})

            }
        }else if(noBall){
            if(bye){
                if(out){

                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');
                    setNoBall(false);

                    check = document.getElementById('byeCheck');
                    check?.setAttribute('checked', 'false');

                    check = document.getElementById('wicketCheck');
                    check?.setAttribute('checked', 'false');
                    setWicketModal(true);
                }else{

                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');
                    setNoBall(false);

                    check = document.getElementById('byeCheck');
                    check?.setAttribute('checked', 'false');

                    setNoBall(false);
                    setBye(false);

                    setRuns(runs+1);

                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                    setBDetails(temp);

                    var logo = document.createElement("div");
                    var num = document.createElement("div");
                    var label = document.createElement("div");
                    label.id = 'overLabel';
                    label.innerHTML = 'BYE & NB';
                    logo.className = 'overBalls';
                    num.innerHTML = '0';
                    num.id = 'num0';
                    logo.appendChild(num);
                    logo.appendChild(label);
                    document.getElementById('overHolder')?.appendChild(logo);

                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                        Extra:{
                            NoBalls: increment(1)
                        },
                        Runs: increment(1)
                    }, {merge:true})
                }
            }else if(legBye){
                if(out){

                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');
                    setNoBall(false);

                    check = document.getElementById('legByeCheck');
                    check?.setAttribute('checked', 'false');

                    check = document.getElementById('wicketCheck');
                    check?.setAttribute('checked', 'false');
                    setWicketModal(true);
                }else{

                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');
                    setNoBall(false);

                    check = document.getElementById('legByeCheck');
                    check?.setAttribute('checked', 'false');

                    setNoBall(false);
                    setLegBye(false);

                    setRuns(runs+1);

                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                    setBDetails(temp);

                    var logo = document.createElement("div");
                    var num = document.createElement("div");
                    var label = document.createElement("div");
                    label.id = 'overLabel';
                    label.innerHTML = 'LB & NB';
                    logo.className = 'overBalls';
                    num.innerHTML = '0';
                    num.id = 'num0';
                    logo.appendChild(num);
                    logo.appendChild(label);
                    document.getElementById('overHolder')?.appendChild(logo);

                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                        Extra:{
                            NoBalls: increment(1)
                        },
                        Runs: increment(1)
                    }, {merge:true})
                }
            }else{
                if(out){
                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');

                    check = document.getElementById('wicketCheck');
                    check?.setAttribute('checked', 'false');
                    setWicketModal(true);
                }else{
                    let check = document.getElementById('noBallCheck');
                    check?.setAttribute('checked', 'false');
                    setNoBall(false);

                    setRuns(runs+1);

                    temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3]+1, bowlerDetails[4]];
                    setBDetails(temp);

                    var logo = document.createElement("div");
                    var num = document.createElement("div");
                    var label = document.createElement("div");
                    label.id = 'overLabel';
                    label.innerHTML = 'NB';
                    logo.className = 'overBalls';
                    num.innerHTML = '0';
                    num.id = 'num0';
                    logo.appendChild(num);
                    logo.appendChild(label);
                    document.getElementById('overHolder')?.appendChild(logo);

                    docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                        Extra:{
                            NoBalls: increment(1)
                        },
                        Runs: increment(1)
                    }, {merge:true})
                }
            }
        }else if(bye){
            if(out){
                let check = document.getElementById('byeCheck');
                check?.setAttribute('checked', 'false');

                check = document.getElementById('wicketCheck');
                check?.setAttribute('checked', 'false');
            }else{
                let check = document.getElementById('byeCheck');
                check?.setAttribute('checked', 'false');

                setBye(false);


                temp = [bowlerDetails[0], bowlerDetails[1], bowlerDetails[2], bowlerDetails[3], bowlerDetails[4]];
                setBDetails(temp);

                var logo = document.createElement("div");
                var num = document.createElement("div");
                var label = document.createElement("div");
                label.id = 'overLabel';
                label.innerHTML = '0 BYE';
                logo.className = 'overBalls';
                num.innerHTML = 'OUT';
                num.id = 'numOut';
                logo.appendChild(num);
                logo.appendChild(label);
                document.getElementById('overHolder')?.appendChild(logo);

                docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                    Extra:{
                        Byes: increment(1)
                    },
                    Wickets: increment(1)
                }, {merge:true})
            }
        }
        else{

            setcurrBall(currBall+1);
            var temp = [P1Details[0], P1Details[1]+1, P1Details[2], P1Details[3]]
            SetP1Details(temp);
            temp = [bowlerDetails[0], bowlerDetails[1]+1, bowlerDetails[2], bowlerDetails[3], bowlerDetails[4]];
            setBDetails(temp);
            setOvers(arr => [...arr, 0]);

            var logo = document.createElement("div");
            var num = document.createElement("div");
            var label = document.createElement("div");
            label.id = 'overLabel';
            label.innerHTML = ' ';
            logo.className = 'overBalls';
            num.innerHTML = '0';
            num.id = 'num0';
            logo.appendChild(num);
            logo.appendChild(label);
            document.getElementById('overHolder')?.appendChild(logo);

            var docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Overs`),{
                [`Over${currOver+1}`]:{
                        [`Ball${currBall+1}`]:{
                            Runs: 0,
                        }
                }
            }, {merge:true})
    
            docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/TotalData`),{
                Overs:{
                    Ball: increment(1)
                },
            }, {merge:true})
    
            docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Batsmen/`),{
                Players:{
                    [`${striker}`]: {
                        Balls: increment(1)
                    }
                }
            }, {merge:true})
    
            docRef = await setDoc(doc(db, `Matches/${match.params.id}/Inning1/Bowlers/`),{
                Players:{
                    [`${bowler}`]: {
                        BallsThrown: increment(1)
                    }
                }
            }, {merge:true})
        }
    }

    const subData = async() => {
        await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Batsmen'),{
            [`Player${wickets}`] : {
              Name: `${striker}`,
              Runs: 0,
              Balls: 0,
              Fours: 0,
              Sixes: 0,
              Status: "onStrike"
            },
            Player2 : {
                Name: `${nonStriker}`,
                Runs: 0,
                Balls: 0,
                Fours: 0,
                Sixes: 0,
                Status: "offStrike"
            }
        })

        await setDoc(doc(db,`Matches/${matchID}/Inning1`,'Bowlers'),{
            Bowler1 : {
                Name: `${bowler}`,
                BallsThrown: 0,
                RunsGiven: 0,
                Maiden: 0,
                Wickets : 0
            }
        })
    }

    useEffect(() => {
        
        getData(match.params.id);
      }, [])


    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{textAlign: "center"}}>{team1} v/s {team2}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonCard class = "scoreSection">
                    <IonCardHeader><div>{team1}, {inning}</div></IonCardHeader>
                    <IonCardContent>
                        <div className = "scoreSectionContent1">
                            <div style={{display: 'flex', alignItems:'center', flexDirection:'column'}}>{runs}-{wickets} <IonText style={{alignSelf:'center'}}>({currOver}.{currBall})</IonText></div>
                            <div><div className='scoreContentHeader1'>CRR</div><div>{isFinite(runs/(currOver + Math.floor(currBall/6))) || 0}</div></div>
                        </div>
                    </IonCardContent>
                </IonCard>


                <IonCard class = "scoreSection">
                    <IonCardContent style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', flexDirection:'column'}}><div className='scoreContentHeader2' style={{justifySelf:'flex-start'}}>Batsman</div><div style={{fontSize:'4vw',fontWeight:'bolder'}}>{striker}*</div><div style={{fontSize:'4vw' ,fontWeight:'bolder'}}>{nonStriker}</div></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div className = "scoreContentHeader2" style={{justifySelf:'flex-start', flexDirection:'row', justifyContent:'space-around'}}>
                                <div><div>R</div><div>{P1Details[0]}</div><div>{P2Details[0]}</div></div>
                                <div><div>B</div><div>{P1Details[1]}</div><div>{P2Details[1]}</div></div>
                                <div><div>4s</div><div>{P1Details[2]}</div><div>{P2Details[2]}</div></div>
                                <div><div>6s</div><div>{P1Details[3]}</div><div>{P2Details[3]}</div></div>
                                <div><div>SR</div><div>{(P1Details[0]*100)/P1Details[1] || 0}</div><div>{(P2Details[0]*100)/P2Details[1] || 0}</div></div>
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonCard class = "scoreSection">
                    <IonCardContent style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', flexDirection:'column'}}><div className='scoreContentHeader2' style={{justifySelf:'flex-start'}}>Bowler</div><div style={{fontSize:'4vw',fontWeight:'bolder'}}>{bowler}</div></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div className = "scoreContentHeader2" style={{justifySelf:'flex-start', flexDirection:'row', justifyContent:'space-around'}}>
                                <div><div>O</div><div>{bowlerDetails[0]+'.'+bowlerDetails[1]}</div></div>
                                <div><div>M</div><div>{bowlerDetails[2]}</div></div>
                                <div><div>R</div><div>{bowlerDetails[3]}</div></div>
                                <div><div>W</div><div>{bowlerDetails[4]}</div></div>
                                <div><div>ER</div><div>{(Math.round(((bowlerDetails[3]/(Math.floor(bowlerDetails[0]/6)+bowlerDetails[1])) + Number.EPSILON) * 100) / 100 ) || 0}</div></div>
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardContent id="overCard"><div>This Over:</div>
                        <div id='overHolder'>
                            {/* <div className='overBalls'><div id="num0">0</div><div id='overLabel'>Label</div></div> */}
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardContent>
                        <div id = 'propSelection'>
                            <div>
                                <IonCheckbox id="wideCheck" onIonChange={e => setWide(e.detail.value)}></IonCheckbox>
                                <IonLabel style={{margin:'0 1vw'}}>Wide</IonLabel>
                            </div>

                            <div>
                                <IonCheckbox id="noBallCheck" onIonChange={e => setNoBall(e.detail.value)}></IonCheckbox>
                                <IonLabel style={{margin:'0 1vw'}}>No Ball</IonLabel>
                            </div>


                            <div>
                                <IonCheckbox id="byeCheck" onIonChange={e => setBye(e.detail.value)}></IonCheckbox>
                                <IonLabel style={{margin:'0 1vw'}}>Bye</IonLabel>
                            </div>

                            <div>
                                <IonCheckbox id="legByeCheck" onIonChange={e => setLegBye(e.detail.value)}></IonCheckbox>
                                <IonLabel style={{margin:'0 1vw'}}>Leg-Bye</IonLabel>
                            </div>
                        </div>

                        <div id = 'propSelection'>
                            <div>
                                <IonCheckbox id="wicketCheck"  onIonChange={(e:any) => {setOut(e.detail.value); fetchBatsmen(); console.log(batsmenAvalible)}} ></IonCheckbox>
                                <IonLabel style={{margin:'0 1vw'}}>Wicket</IonLabel>
                            </div>

                            <div>
                                <IonButton>Swap Batsman</IonButton>
                            </div>

                            <div>
                                <IonButton>Retire</IonButton>
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonCard id='runsCard'>
                    <IonCardContent>
                        <IonButton>Undo</IonButton>
                    </IonCardContent>
                    <IonCardContent id = 'runsCardContent'>
                        <IonFabButton size='small' onClick={() =>zero()}>0</IonFabButton>
                        <IonFabButton size='small'>1</IonFabButton>
                        <IonFabButton size='small'>2</IonFabButton>
                        <IonFabButton size='small'>3</IonFabButton>
                        <IonFabButton size='small'>4</IonFabButton>
                        <IonFabButton size='small'>5</IonFabButton>
                        <IonFabButton size='small'>6</IonFabButton>
                        <IonFabButton size='small'>...</IonFabButton>
                    </IonCardContent>
                </IonCard>
                <IonModal ref={modal} isOpen = {wicketModal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>Choose Next Batsman</IonTitle>
                        <IonButtons slot="end">
                            <IonButton strong={true} onClick={() => confirm()}>
                            Confirm
                            </IonButton>
                        </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                            <IonLabel position="stacked">How the wicket fell?</IonLabel>
                            <IonSelect placeholder='How did the wicket fell?' interface='popover' onIonChange={(e) => {wicketTypeSet(e.detail.value); console.log(e.detail.value)}}>
                                <IonSelectOption value = "Bowled">Bowled</IonSelectOption>
                                <IonSelectOption value = "Catch Out">Catch Out</IonSelectOption>
                                <IonSelectOption value = "Striker Run Out">Striker Run Out</IonSelectOption>
                                <IonSelectOption value = "Non-Striker Run Out">Non-Striker Run Out</IonSelectOption>
                                <IonSelectOption value = "Stumping">Stumping</IonSelectOption>
                                <IonSelectOption value = "Hit Wicket">Hit Wicket</IonSelectOption>
                            </IonSelect>
                            <div id = "wicketSlot1"></div>
                            <IonLabel position="stacked">New Batsman</IonLabel>
                            <IonSelect placeholder='New Batsman' interface='popover' onIonChange={(e) => {setNewBatsmen(e.detail.value)}}>
                                {batsmenAvalible.map(player => (
                                    <IonSelectOption key={player}>{player}</IonSelectOption>
                                ))}
                            </IonSelect>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Scoring;