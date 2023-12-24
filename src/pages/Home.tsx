import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFooter, IonSegment, IonSegmentButton,IonSlides,
  IonSlide, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonMenu, IonFab, IonFabButton,
  IonMenuButton, IonCardHeader, IonCardSubtitle, IonButton, useIonAlert, IonRouterOutlet, IonCardTitle, IonButtons, IonList, IonAccordion, IonItem, IonLabel, IonAccordionGroup, IonText, IonRouterLink  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { IonReactRouter } from '@ionic/react-router';
import { useParams, Route } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import './Home.scss';
import Tab3 from './Login';
import Tab1 from './Tab1';
import Tournament from './Tournament';
import React, { Component } from 'react';
import {
  home,
  person,
  baseball,
  calendar,
  refreshOutline
} from 'ionicons/icons';
import { CreateAnimation, Animation } from '@ionic/react';
import Teams from './innerPages/Teams';
import { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';
import { initializeApp } from "firebase/app";
import { arrayRemove, getDoc, getFirestore, query, where } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, orderBy,limit } from "firebase/firestore"; 
import { getDatabase, ref, child, get, onValue } from "firebase/database";

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
const dbRef = ref(getDatabase());

const settings = () => <IonPage>Onee CHan</IonPage>



const Tab2: React.FC = () => {
  useEffect(() => {
    loadData()
  }, [])
  const [presentAlert] = useIonAlert();
  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev:any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        presentAlert({
          header: 'Exit?',
          cssClass: 'custom-alert',
          subHeader: 'Do you want to exit?',
          message: 'Leaving so soon?',
          buttons: [
            {
              text: 'Yes',
              role: 'yes',
              cssClass:'yes',
              handler: () => {
                App.exitApp();
              },
            },
            {
              text: 'No',
              role: 'no',
              cssClass:'no',
              handler: () => {
                
              },
            },
          ],
        })
        //App.exitApp();
      }
    });
  });

  const [matchID, setMatchID] = useState('');
  var tempID = "";
  const [team1, setTeam1] = useState('')
  var tempT1 = "";
  const [team2, setTeam2] = useState('')
  var tempT2 = "";
  const [inning, setinning] = useState('')
  var tempInning = "";
  const [foundLive, setFoundLive] = useState(false);

  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [target, setTarget] = useState(0);
  var tempTarget = 0;

  const[p1, setP1] = useState("Coming Soon");
  const[p1Runs, setP1Runs] = useState(0);
  
  const[p2, setP2] = useState("Coming Soon");
  const[p2Runs, setP2Runs] = useState(0);
  
  const[p3, setP3] = useState("Coming Soon");
  const[p3Runs, setP3Runs] = useState(0);
  
  const[p4, setP4] = useState("Coming Soon");
  const[p4Runs, setP4Runs] = useState(0);
  
  const[p5, setP5] = useState("Coming Soon");
  const[p5Runs, setP5Runs] = useState(0);

  const[b1, setb1] = useState("Coming Soon");
  const[b1Wickets, setB1Wickets] = useState(0);
  
  const[b2, setb2] = useState("Coming Soon");
  const[b2Wickets, setB2Wickets] = useState(0);

  const[b3, setb3] = useState("Coming Soon");
  const[b3Wickets, setB3Wickets] = useState(0);

  const[b4, setb4] = useState("Coming Soon");
  const[b4Wickets, setB4Wickets] = useState(0);

  const[b5, setb5] = useState("Coming Soon");
  const[b5Wickets, setB5Wickets] = useState(0);
  

  const loadData = async () => {

    var batRef = ref(database, `Batsmen/Player1/Name`);
    onValue(batRef, (snapshot) => {
      setP1(snapshot.val())
    })

    var batRef = ref(database, `Batsmen/Player2/Name`);
    onValue(batRef, (snapshot) => {
      setP2(snapshot.val())
    })

    var batRef = ref(database, `Batsmen/Player3/Name`);
    onValue(batRef, (snapshot) => {
      setP3(snapshot.val())
    })

    var batRef = ref(database, `Batsmen/Player4/Name`);
    onValue(batRef, (snapshot) => {
      setP4(snapshot.val())
    })

    var batRef = ref(database, `Batsmen/Player5/Name`);
    onValue(batRef, (snapshot) => {
      setP5(snapshot.val())
    })

    batRef = ref(database, `Batsmen/Player1/Runs`);
    onValue(batRef, (snapshot) =>{
      setP1Runs(snapshot.val())
    })

    batRef = ref(database, `Batsmen/Player2/Runs`);
    onValue(batRef, (snapshot) =>{
      setP2Runs(snapshot.val())
    })

    batRef = ref(database, `Batsmen/Player3/Runs`);
    onValue(batRef, (snapshot) =>{
      setP3Runs(snapshot.val())
    })

    batRef = ref(database, `Batsmen/Player4/Runs`);
    onValue(batRef, (snapshot) =>{
      setP4Runs(snapshot.val())
    })

    batRef = ref(database, `Batsmen/Player5/Runs`);
    onValue(batRef, (snapshot) =>{
      setP5Runs(snapshot.val())
    })

    var bowlRef = ref(database, `Bowlers/Player1/Name`);
    onValue(bowlRef, (snap) =>{
      setb1(snap.val());
    })

    var bowlRef = ref(database, `Bowlers/Player2/Name`);
    onValue(bowlRef, (snap) =>{
      setb2(snap.val());
    })

    var bowlRef = ref(database, `Bowlers/Player3/Name`);
    onValue(bowlRef, (snap) =>{
      setb3(snap.val());
    })

    var bowlRef = ref(database, `Bowlers/Player4/Name`);
    onValue(bowlRef, (snap) =>{
      setb4(snap.val());
    })

    var bowlRef = ref(database, `Bowlers/Player5/Name`);
    onValue(bowlRef, (snap) =>{
      setb5(snap.val());
    })

    bowlRef = ref(database, `Bowlers/Player1/Wickets`);
    onValue(bowlRef, (snap) =>{
      setB1Wickets(snap.val())
    })

    
    bowlRef = ref(database, `Bowlers/Player2/Wickets`);
    onValue(bowlRef, (snap) =>{
      setB2Wickets(snap.val())
    })

    
    bowlRef = ref(database, `Bowlers/Player3/Wickets`);
    onValue(bowlRef, (snap) =>{
      setB3Wickets(snap.val())
    })

    
    bowlRef = ref(database, `Bowlers/Player4/Wickets`);
    onValue(bowlRef, (snap) =>{
      setB4Wickets(snap.val())
    })

    
    bowlRef = ref(database, `Bowlers/Player5/Wickets`);
    onValue(bowlRef, (snap) =>{
      setB5Wickets(snap.val())
    })


    console.log("W")
      var temp = document.getElementById('scoreCardStatus');
      var RunCard = document.getElementById('runsCard');
      var sub = document.getElementById('scoreCardSub');
      var scoreCard = document.getElementById('ScoreCard')

      if(temp){
        temp.innerHTML = "Next Match Soon!";
      }

      if(sub){
        sub.innerHTML = "Proudly Sponsored By:"
        sub.style.padding = "1vw"
        var items = [require("D:/Ionic/Apps/ucl-world/src/resources/MASTERSPORTS.jpg"), require("D:/Ionic/Apps/ucl-world/src/resources/Muscle.jpg"),  require("D:/Ionic/Apps/ucl-world/src/resources/bloom.jpeg"),  require("D:/Ionic/Apps/ucl-world/src/resources/RENAX.jpg")]
        var addr = ["https://goo.gl/maps/iwPsgmdkDRd4fpJ57", "https://goo.gl/maps/a7HbSB2HHF7PZyTb6","https://goo.gl/maps/9xcip1Z3c5t9ey1LA", "https://goo.gl/maps/xRqBwzNpPtjLjVjj6"]
        var img = document.createElement("ion-img")

        var item = items[Math.floor(Math.random()*items.length)]
        
        img.addEventListener("click", (e) =>{
          console.log(items.indexOf(item))
          window.open(addr[items.indexOf(item)])
        })
        img.setAttribute("src", item)
        img.style.margin = "3vw"
        sub.appendChild(img)
      }

      unsub()
    // const docRef = await getDocs(collection(db,`Matches`));
    
    // console.log(foundLive)
    // docRef.forEach((doc) =>{
    //   if(doc.data().State != "Finished"){
    //       console.log("gubf");
    //       setMatchID(doc.id)
    //       setFoundLive(true);
    //       setTeam1(doc.data().Team1);
    //       setTeam2(doc.data().Team2);
    //       setinning(doc.data().State);

    //       var temp = document.getElementById('scoreCardStatus');
    //       var sub = document.getElementById('scoreCardSub');
    //       if(temp){
    //         temp.innerHTML = doc.data().Team1+" v/s " +doc.data().Team2;
    //       }

    //       if(sub){
    //         sub.innerHTML = doc.data().TossWon+" won the toss and chose to "+doc.data().TossTeamSelected
    //       }
    //   }else{
    //     var sub = document.getElementById('scoreCardSub');

    //     // if(sub){
    //     //   sub.innerHTML = 
    //     // }
    //   }
    // })

    // var playerRef = await getDocs(collection(db,"Teams"));

    // var teamIDs = [""]

    // teamIDs.shift();

    // playerRef.forEach((doc) => {
    //   teamIDs.push(doc.id);
    // })

    // console.log(teamIDs);

    // var index = 0;

    // playerRef = await getDocs(collection(db, `Teams/${teamIDs[index]}/Players`));
}


const unsub = async() => {
  // const q = query(collection(db, `Matches`), orderBy("Timestamp"), limit(1));

  // const docRef = await getDocs(q);
  // var doc = docRef.docs[docRef.docs.length-1];

  var dbRef = ref(database, "CurrMatch");

  onValue(dbRef,(snap)=>{
    console.log(snap.val())
    if(snap.val().State != "Finished"){
      setFoundLive(true);
      setTeam1(snap.val().Team1);
      setTeam2(snap.val().Team2);
      setinning(snap.val().State);
      setTarget(snap.val().Target)
      console.log(snap.val())

      tempInning = snap.val().State;
      tempT1 = snap.val().Team1;
      tempT2 = snap.val().Team2;
      tempTarget = snap.val().Target;

      var temp = document.getElementById('scoreCardStatus');
      var sub = document.getElementById('scoreCardSub');
      var RunCard = document.getElementById('runsCard');
      var scoreCard = document.getElementById('ScoreCard')
      if(temp){
        temp.innerHTML = snap.val().Team1+" v/s " +snap.val().Team2;
      }

      if(sub){
        sub.innerHTML = snap.val().TossWon+" won the toss and chose to "+snap.val().TossTeamSelected
      }
      refresh();
    }else if(snap.val().State == "Finished"){
      console.log("this")
      setFoundLive(false);
      var temp = document.getElementById('scoreCardStatus');
      var sub = document.getElementById('scoreCardSub');
      var RunCard = document.getElementById('runsCard');
      var scoreCard = document.getElementById('ScoreCard')
      if(temp){
        temp.innerHTML = "Next Match Soon!";
      }

      if(scoreCard){
        scoreCard.children[0].innerHTML = "";
      }

      if(sub){
        sub.innerHTML = snap.val().Winners + " won the match!"
      }

      if(RunCard){
        RunCard.innerHTML = "Proudly Sponsored By:"
        RunCard.style.padding = "1vw"
        RunCard.style.fontSize = '5vw';
        RunCard.style.display = 'flex'
        RunCard.style.flexDirection = 'column'
        var items = [require("D:/Ionic/Apps/ucl-world/src/resources/MASTERSPORTS.jpg"), require("D:/Ionic/Apps/ucl-world/src/resources/Muscle.jpg"),  require("D:/Ionic/Apps/ucl-world/src/resources/bloom.jpeg"),  require("D:/Ionic/Apps/ucl-world/src/resources/RENAX.jpg")]
        var addr = ["https://goo.gl/maps/iwPsgmdkDRd4fpJ57", "https://goo.gl/maps/a7HbSB2HHF7PZyTb6","https://goo.gl/maps/9xcip1Z3c5t9ey1LA", "https://goo.gl/maps/xRqBwzNpPtjLjVjj6"]
        var img = document.createElement("ion-img")

        var item = items[Math.floor(Math.random()*items.length)]
        
        img.addEventListener("click", (e) =>{
          console.log(items.indexOf(item))
          window.open(addr[items.indexOf(item)])
        })
        img.setAttribute("src", item)
        img.style.margin = "3vw"
        RunCard.appendChild(img)
      }
    }
  })

  // console.log(foundLive);
  //   if(doc?.data().State != "Finished" && doc?.data().State){
  //       setMatchID(doc?.id)
  //       setFoundLive(true);
  //       setTeam1(doc?.data().Team1);
  //       setTeam2(doc?.data().Team2);
  //       setinning(doc?.data().State);
  //       setTarget(doc?.data().Target)
  //       console.log(doc?.data())

  //       tempID = doc?.id;
  //       tempInning = doc?.data().State;
  //       tempT1 = doc?.data().Team1;
  //       tempT2 = doc?.data().Team2;

  //       var temp = document.getElementById('scoreCardStatus');
  //       var sub = document.getElementById('scoreCardSub');
  //       var RunCard = document.getElementById('runsCard');
  //       var scoreCard = document.getElementById('ScoreCard')
  //       if(temp){
  //         temp.innerHTML = doc?.data().Team1+" v/s " +doc?.data().Team2;
  //       }

  //       if(sub){
  //         sub.innerHTML = doc?.data().TossWon+" won the toss and chose to "+doc?.data().TossTeamSelected
  //       }
  //       refresh();
  //   }else if(doc?.data().State == "Finished"){
  //     setFoundLive(false);
  //     var temp = document.getElementById('scoreCardStatus');
  //     var sub = document.getElementById('scoreCardSub');
  //     var RunCard = document.getElementById('runsCard');
  //     var scoreCard = document.getElementById('ScoreCard')
  //     if(temp){
  //       temp.innerHTML = "Next Match Soon!";
  //     }

  //     if(scoreCard){
  //       scoreCard.children[0].innerHTML = "";
  //     }

  //     if(sub){
  //       sub.innerHTML = doc?.data().Winners + " won the match!"
  //     }

  //     if(RunCard){
  //       RunCard.innerHTML = "Proudly Sponsored By:"
  //       RunCard.style.padding = "1vw"
  //       RunCard.style.fontSize = '5vw';
  //       RunCard.style.display = 'flex'
  //       RunCard.style.flexDirection = 'column'
  //       var items = [require("D:/Ionic/Apps/ucl-world/src/resources/master.jpg"), require("D:/Ionic/Apps/ucl-world/src/resources/Muscle.jpg"),  require("D:/Ionic/Apps/ucl-world/src/resources/bloom.jpeg")]
  //       var addr = ["https://goo.gl/maps/iwPsgmdkDRd4fpJ57", "https://goo.gl/maps/a7HbSB2HHF7PZyTb6","https://goo.gl/maps/9xcip1Z3c5t9ey1LA"]
  //       var img = document.createElement("ion-img")

  //       var item = items[Math.floor(Math.random()*items.length)]
        
  //       img.addEventListener("click", (e) =>{
  //         console.log(items.indexOf(item))
  //         window.open(addr[items.indexOf(item)])
  //       })
  //       img.setAttribute("src", item)
  //       img.style.margin = "3vw"
  //       RunCard.appendChild(img)
  //     }
  //   }else{
  //     console.log("W")
  //     var temp = document.getElementById('scoreCardStatus');
  //     var RunCard = document.getElementById('runsCard');
  //     var sub = document.getElementById('scoreCardSub');
  //     var scoreCard = document.getElementById('ScoreCard')

  //     if(temp){
  //       temp.innerHTML = "Next Match Soon!";
  //     }

  //     if(scoreCard){
  //       scoreCard.innerHTML = "";
  //     }

  //     if(sub){
  //       sub.innerHTML = "Proudly Sponsored By:"
  //       sub.style.padding = "1vw"
  //       var items = [require("D:/Ionic/Apps/ucl-world/src/resources/master.jpg"), require("D:/Ionic/Apps/ucl-world/src/resources/Muscle.jpg"),  require("D:/Ionic/Apps/ucl-world/src/resources/bloom.jpeg")]
  //       var addr = ["https://goo.gl/maps/iwPsgmdkDRd4fpJ57", "https://goo.gl/maps/a7HbSB2HHF7PZyTb6","https://goo.gl/maps/9xcip1Z3c5t9ey1LA"]
  //       var img = document.createElement("ion-img")

  //       var item = items[Math.floor(Math.random()*items.length)]
        
  //       img.addEventListener("click", (e) =>{
  //         console.log(items.indexOf(item))
  //         window.open(addr[items.indexOf(item)])
  //       })
  //       img.setAttribute("src", item)
  //       img.style.margin = "3vw"
  //       sub.appendChild(img)
  //     }

  //     if(RunCard){
  //       RunCard.innerHTML = "To Find the next match, open the fixtures!"
  //     }
  //   }
}

const refresh = async () => {
    // const docRef = await getDoc(doc(db, `Matches/${tempID}/${tempInning}/TotalData`));
      console.log(tempInning)

      var dbRef = ref(database, `CurrMatch/${tempInning}`);

      onValue(ref(database, `CurrMatch/${tempInning}`),(snap)=>{
        console.log(snap.val())
        setRuns(snap.val().Runs);

        var RunCard = document.getElementById('runsCard');
      var scoreCard = document.getElementById('ScoreCard')
      var sub = document.getElementById('scoreCardSub');
      if(scoreCard){
        scoreCard.innerHTML="";
      }
      var info = document.createElement('div');
      if(tempInning == "Inning1"){
        console.log("jhnn")
        info.innerHTML = `${tempT1}`+" "+`${tempInning}`
      }else{
        info.innerHTML = `${tempT2}`+" "+`${tempInning}`
        if(sub){
          sub.innerHTML = `Target: ${tempTarget}`
        }
      }

      scoreCard?.appendChild(info);
      console.log("wrtt")
      if(RunCard){
        RunCard.style.fontSize = "10vw";
        RunCard.style.flexDirection = "row";
        console.log(runs);
        RunCard.innerHTML = `${snap.val().Runs || 0}` + "/" + `${snap.val().Wickets || 0}`;
        var divCard = document.createElement("div");
        RunCard.appendChild(divCard)
        RunCard.children[0].setAttribute("id", "oversCard")
        RunCard.children[0].innerHTML = `${snap.val().Overs.Over || 0}` + "." + `${snap.val().Overs.Ball || 0}`;
        scoreCard?.appendChild(RunCard);
      }else{
        RunCard = document.createElement('div');
        RunCard.setAttribute('id', 'runsCard');
        RunCard.innerHTML = `${snap.val().Runs || 0}` + "/" + `${snap.val().Wickets || 0}`;
        var divCard = document.createElement("div");
        RunCard.appendChild(divCard)
        RunCard.children[0].setAttribute("id", "oversCard")
        RunCard.children[0].innerHTML = `${snap.val().Overs.Over || 0}` + "." + `${snap.val().Overs.Ball || 0}`;
        scoreCard?.appendChild(RunCard);
      }
      setWickets(snap.val().Wickets);
      setBalls(snap.val().Overs.Ball);
      setOvers(snap.val().Overs.Over);
      })
}

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/teams" component={settings}></Route>
      </IonRouterOutlet>
      <IonMenu contentId="main-content">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Tournament</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
              <IonCard class = "drawerCard" routerLink='/fixtures'>
                <IonCardTitle class = "drawerTitle">Fixtures</IonCardTitle>
              </IonCard>
              <IonCard  class = "drawerCard">
              <IonCardTitle class = "drawerTitle">
              <IonAccordionGroup  expand="compact">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonText class = "navHeaders">Points Table (Phase-1)</IonText>
                </IonItem>
                <div className="ion-padding" slot="content">
                <IonRouterLink routerLink='/points/A'>
                      Group A
                </IonRouterLink>
                </div>
                <div className="ion-padding" slot="content">
                <IonRouterLink routerLink='/points/B'>
                      Group B
                </IonRouterLink>
                </div>
              </IonAccordion>
              </IonAccordionGroup>
              </IonCardTitle>
              </IonCard>
              <IonCard  class = "drawerCard">
              <IonCardTitle class = "drawerTitle">
              <IonAccordionGroup  expand="compact">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonText class = "navHeaders">Teams (Phase-1)</IonText>
                </IonItem>
                <div className="ion-padding" slot="content">
                <IonRouterLink routerLink='/teams/A'>
                      Group A
                </IonRouterLink>
                </div>
                <div className="ion-padding" slot="content">
                <IonRouterLink routerLink='/teams/B'>
                      Group B
                </IonRouterLink>
                </div>
              </IonAccordion>
              </IonAccordionGroup>
              </IonCardTitle>
              </IonCard>
              <IonCard class = "drawerCard" routerLink='/about'>
                <IonCardTitle class = "drawerTitle">About Us</IonCardTitle>
              </IonCard>
           </IonList>
            </IonContent>
            <IonFooter style={{display:'flex', alignContent:'left', fontSize:'10vw', justifyContent:'flex-end', opacity:'15%'}}>
              <IonText style={{margin:'0 5vw', fontFamily:"Bungee"}}>Dhruv</IonText>
            </IonFooter>
          </IonMenu>
      <IonContent fullscreen id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" id="menuBtn">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle class = "neonText">UCL World</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle id='scoreCardStatus' class = "neonText neonText1">Starting Soon!</IonCardTitle>
            <IonCardSubtitle id='scoreCardSub'></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent id="ScoreCard">
            <div>{team1} {inning}</div>
            <div id="runsCard">
              {runs || 0}/{wickets || 0}
              <div id="oversCard">
                ({overs || 0}.{balls || 0})
              </div>
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard>
        <article className="leaderboard2">
      <header>
      
        <h1 className="leaderboard__title"><span className="leaderboard__title--top">Highest Run Scorers</span><span className="leaderboard__title--bottom">Leaderboard</span></h1>
      </header>
          <main className="leaderboard__profiles">

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{p1}</span>
            <span className="leaderboard__value">{p1Runs}</span>
          </article>	

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{p2}</span>
            <span className="leaderboard__value">{p2Runs}</span>
          </article>	
          <article className="leaderboard__profile">
            <span className="leaderboard__name">{p3}</span>
            <span className="leaderboard__value">{p3Runs}</span>
          </article>	
          <article className="leaderboard__profile">
            <span className="leaderboard__name">{p4}</span>
            <span className="leaderboard__value">{p4Runs}</span>
          </article>	
          <article className="leaderboard__profile">
            <span className="leaderboard__name">{p5}</span>
            <span className="leaderboard__value">{p5Runs}</span>
          </article>	
          </main>
          </article>
        </IonCard>

        <IonCard>
        <article className="leaderboard">
      <header>
      
        <h1 className="leaderboard__title"><span className="leaderboard__title--top">Highest Wicket Takers</span><span className="leaderboard__title--bottom">Leaderboard</span></h1>
      </header>
          <main className="leaderboard__profiles">

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{b1}</span>
            <span className="leaderboard__value">{b1Wickets}</span>
          </article>	

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{b2}</span>
            <span className="leaderboard__value">{b2Wickets}</span>
          </article>	

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{b3}</span>
            <span className="leaderboard__value">{b3Wickets}</span>
          </article>	

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{b4}</span>
            <span className="leaderboard__value">{b4Wickets}</span>
          </article>	

          <article className="leaderboard__profile">
            <span className="leaderboard__name">{b5}</span>
            <span className="leaderboard__value">{b5Wickets}</span>
          </article>	

          </main>
          </article>
        </IonCard>
        <IonImg src={require('D:/Ionic/Apps/ucl-world/src/resources/bg-1.png')} />
      </IonContent>
      {/* <IonFooter>
         <IonToolbar>
           <IonSegment value="all">
              <IonCard>
              <IonSegmentButton className='tbut'>
                <IonIcon icon = {calendar}></IonIcon>
                  PlayerBoard
                </IonSegmentButton>
              </IonCard>
              <IonCard>
              <IonSegmentButton value="all">
                <IonIcon icon = {home}></IonIcon>
                Home
              </IonSegmentButton>
              </IonCard>

             <IonCard routerLink='/profile'>
              <IonSegmentButton value="favorites">
              <IonIcon icon = {person}></IonIcon>
                Profile
              </IonSegmentButton>
             </IonCard>
           </IonSegment>
           </IonToolbar>
       </IonFooter> */}
    </IonPage>
  );
};

export default Tab2;
