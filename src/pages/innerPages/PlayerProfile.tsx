import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, getDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyADz4-Bl5zmdSeqKL9_-R_nVE_cYq0wrNs",
    authDomain: "ucl-world.firebaseapp.com",
    projectId: "ucl-world",
    storageBucket: "ucl-world.appspot.com",
    messagingSenderId: "902007452528",
    appId: "1:902007452528:web:6406d4aaf22276273495b5",
    measurementId: "G-SFSZ0ND31E",
    databaseURL: "https://ucl-world-default-rtdb.asia-southeast1.firebasedatabase.app/",

  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const database = getDatabase(app);


  interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const PlayerInfo: React.FC<UserDetailPageProps> = ({ match }) => {

    const [name, setName] = useState("Loading");
    const [team, setTeam] = useState("Loading");
    const [branch, setBranch] = useState("Loading");
    const [matches, setMatches] = useState(0);
    const [runsScored, setRunsScored] = useState(0);
    const [fours, setFours] = useState(0);
    const [sixes, setSixes] = useState(0);
    const [outs, setOuts] = useState(0);
    const [ballsFaced, setBallsFaced] = useState(0);
    const [fifties, setFifties] = useState(0);
    const [ballsThrown, setBallsThrown] = useState(0);
    const [runsGiven, setRunsGiven] = useState(0);
    const [Wickets, setWickets] = useState(0);
    const [fiveWickets, setFiveWickets] = useState(0);

    const loadData = async() => {

        console.log(match.params.id);
        var id = match.params.id;
        var index = id.indexOf(".");
        var pName = id.substring(0, index);
        const tName = id.substring(index+1);
        console.log(pName+" and "+tName);

        var dbRef = ref(database, `Teams/${tName}/Players/${pName}`);

        onValue(dbRef, (snap) =>{
            console.log(snap.val());
            setName(pName);
            setTeam(snap.val().Branch);
            setMatches(Object.keys(snap.val().Matches).length);
            setRunsScored(snap.val().RunsScored);
            setOuts(snap.val().Outs);
            setBallsFaced(snap.val().BallsFaced);
            setFifties(snap.val().Fifties);
            setBallsThrown(snap.val().BallsThrown);
            setRunsGiven(snap.val().RunsGiven);
            setWickets(snap.val().Wickets);
            setFiveWickets(snap.val().FiveWickets);
            setBranch(snap.val().Branch);
            setFours(snap.val().Fours);
            setSixes(snap.val().Sixes);
        })

        // const querySnapshot = await getDocs(collection(db, 'Teams', tName, 'Players'));
        //       querySnapshot.forEach((doc) => {
        //         if(doc.id == pName){
        //             setName(doc.data().Name);
        //             setTeam(doc.data().Branch);
        //             setMatches(doc.data().Matches.length);
        //             setRunsScored(doc.data().RunsScored);
        //             setOuts(doc.data().Outs);
        //             setBallsFaced(doc.data().BallsFaced);
        //             setFifties(doc.data().Fifties);
        //             setBallsThrown(doc.data().BallsThrown);
        //             setRunsGiven(doc.data().RunsGiven);
        //             setWickets(doc.data().Wickets);
        //             setFiveWickets(doc.data().FiveWickets);
        //             setBranch(doc.data().Branch);
        //             setFours(doc.data().Fours);
        //             setSixes(doc.data().Sixes);
        //         }
        //         });
      
      }


      useEffect(() => {
        loadData()
      }, [])
    
return(
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start" id = "bckBtn">
                <IonBackButton defaultHref={`/teamInfo/${team}`}></IonBackButton>
            </IonButtons>
          <IonTitle>Player Info</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonCard>
            <IonCardHeader style={{fontSize:"5vw", color:"#eb445a"}}>{name}</IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonText>Matches: {matches}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonCard>
                            <IonCardHeader style={{fontSize:"4vw", color:"#eb445a"}}>Batting Statistics</IonCardHeader>
                            <IonCardContent>
                                <IonList>
                                    <IonItem>
                                        <IonText>Runs Scored: {runsScored}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Batting Average: {(runsScored/outs) || 0}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Strike Rate: {(Math.round(((runsScored*100/ballsFaced) + Number.EPSILON) * 100) / 100) || 0}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>50s: {fifties}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>4s: {fours}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>6s: {sixes}</IonText>
                                    </IonItem>
                                </IonList>
                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                    <IonItem>
                        <IonCard>
                            <IonCardHeader style={{fontSize:"4vw", color:"#eb445a"}}>Bowling Statistics</IonCardHeader>
                            <IonCardContent>
                            <IonList>
                                    <IonItem>
                                        <IonText>Balls Thrown: {ballsThrown}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Runs Given: {runsGiven}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Wickets: {Wickets}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Bowling Average: {(runsGiven/Wickets) || 0}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>Economy: {(Math.round(((runsGiven/(ballsThrown/6)) + Number.EPSILON) * 100) / 100) || 0}</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText>5Ws: {fiveWickets}</IonText>
                                    </IonItem>
                                </IonList>
                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    </IonContent>
    </IonPage>
)

}

export default PlayerInfo;