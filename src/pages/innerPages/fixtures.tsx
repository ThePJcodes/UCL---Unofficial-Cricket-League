import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText,IonChip, IonSlide, IonSlides, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet, IonLabel} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue } from "firebase/database";


import './fixtures.scss'
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
const database = getDatabase(app);

// const unsub = onSnapshot(doc(db, "Teams"), (doc) => {
//   var temp = doc.data();
//   var text = document.getElementById("CSD Daredevils");
//   if(text && temp){
//     text.innerHTML = temp[0];
//   console.log("Current data: ", temp[0]);
//   }
// });

var rendered = false;

async function start() {
    
    if(!rendered){
        rendered = true;
        const querySnapshot = await getDocs(collection(db, "Teams"));
        querySnapshot.forEach((doc) => {
            if(doc.data().Group == "A"){
                console.log(doc.id, " => ", doc.data());
                const card = document.createElement('IonCard');
                const text = document.createElement('IonCardTitle')
                text.innerHTML = `${doc.id}`;
                const list = document.getElementsByClassName('cards')[0];
                while (list.hasChildNodes()) {
                    if(list.hasChildNodes()){
                        list.removeChild(list.children[0]);
                    }
                }
                if(list){
                    list.appendChild(card);
                    card.appendChild(text);

                }else{
                    console.log("ok");
                }
            }
        });
        console.log("once");
    }
  }

  interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const Fixtures: React.FC<UserDetailPageProps> = ({ match }) => {
  const history = useHistory();

const [group, setGroup] = useState("");
const [days, setDays] = useState(["Loading!"]);
const [team1, setTeam1] = useState(["Loading!"]);
const [team2, setTeam2] = useState(["Loading!"]);
const [slot, setSlot] = useState([0]);

const loadData = async() => {
  var i = 1;

  var dataref = ref(database, 'Fixtures');
  days.shift();
  onValue(dataref, (snap)=>{
    for(const match in snap.val()){
      var dateRef = ref(database, `Fixtures/${match}/Date`);
      var team1text = document.createElement("ion-text");
      var team2text = document.createElement("ion-text");
      onValue(dateRef, (snapshot)=>{
        
        
        var team2elem = document.getElementById('team2ID');
        var dates = document.getElementById('dates');
        var dateItem = document.createElement('ion-item');
        dateItem.setAttribute("key", i.toString());
        dateItem.color = "dark";
        dateItem.innerHTML = snapshot.val();
        dates?.appendChild(dateItem);
      })

      dateRef = ref(database, `Fixtures/${match}/Team1`);
      onValue(dateRef, (snapshot)=>{
        var team1elem = document.getElementById('team1ID');
        var team1item = document.createElement("ion-item");
        team1item.color = "light"
        team1item.setAttribute("key", i.toString()+snapshot.val());

        team1text.innerHTML = snapshot.val()
        team1item.appendChild(team1text);
        team1elem?.appendChild(team1item);
      })

      dateRef = ref(database, `Fixtures/${match}/Team2`);
      onValue(dateRef, (snapshot)=>{
        var team2elem = document.getElementById('team2ID');
        var team2item = document.createElement("ion-item");
        
        team2item.color = "light"
        team2item.setAttribute("key", i.toString()+snapshot.val());

        team2text.innerHTML = snapshot.val();
        team2item.appendChild(team2text);
        team2elem?.appendChild(team2item);
      })

      dateRef = ref(database, `Fixtures/${match}/Slot`);
      onValue(dateRef, (snapshot)=>{
        if(snapshot.val() == 1){
          team1text.color = "primary"
          team2text.color = "primary"
        }else if(snapshot.val() == 2){
          team1text.color = "secondary"
          team2text.color = "secondary"
        }else if(snapshot.val() == 3){
          team1text.color = "success"
          team2text.color = "success"
        }
      })
    }
  })

  // const querySnapshot = await getDocs(collection(db, "Fixtures"));
  //       querySnapshot.forEach((doc) => {
  //           days.shift();
  //           team1.shift();
  //           team2.shift();
  //           slot.shift();
  //           setDays(arr => [...arr, `${doc.data().Date}`] );
  //           setTeam1(arr => [...arr, `${doc.data().Team1}`]);
  //           setTeam2(arr => [...arr, `${doc.data().Team2}`]);
  //           setSlot(arr => [...arr, parseInt(`${doc.data().Slot}`)]);

  //           var team1elem = document.getElementById('team1ID');
  //           var team2elem = document.getElementById('team2ID');
  //           var dates = document.getElementById('dates');
  //           var dateItem = document.createElement('ion-item');
  //           dateItem.setAttribute("key", i.toString());
  //           dateItem.color = "dark";
  //           dateItem.innerHTML = doc.data().Date;
  //           dates?.appendChild(dateItem);

  //           var team1item = document.createElement("ion-item");
  //           var team1text = document.createElement("ion-text");
  //           team1item.color = "light"
  //           team1item.setAttribute("key", i.toString()+doc.data().Team1);

  //           if(doc.data().Slot == 1){
  //             team1text.color = "primary"
  //           }else if(doc.data().Slot == 2){
  //             team1text.color = "secondary"
  //           }else if(doc.data().Slot == 3){
  //             team1text.color = "success"
  //           }

  //           team1text.innerHTML = doc.data().Team1;
  //           team1item.appendChild(team1text);
  //           team1elem?.appendChild(team1item);

  //           var team2item = document.createElement("ion-item");
  //           var team2text = document.createElement("ion-text");
  //           team2item.color = "light"
  //           team2item.setAttribute("key", i.toString()+doc.data().Team2);

  //           if(doc.data().Slot == 1){
  //             team2text.color = "primary"
  //           }else if(doc.data().Slot == 2){
  //             team2text.color = "secondary"
  //           }else if(doc.data().Slot == 3){
  //             team2text.color = "success"
  //           }

  //           team2text.innerHTML = doc.data().Team2;
  //           team2item.appendChild(team2text);
  //           team2elem?.appendChild(team2item);

  //           i++;

  //       });

  var items = [require("D:/Ionic/Apps/ucl-world/src/resources/MASTERSPORTS.jpg"), require("D:/Ionic/Apps/ucl-world/src/resources/Muscle.jpg"),  require("D:/Ionic/Apps/ucl-world/src/resources/bloom.jpeg"),  require("D:/Ionic/Apps/ucl-world/src/resources/RENAX.jpg")]
  var addr = ["https://goo.gl/maps/iwPsgmdkDRd4fpJ57", "https://goo.gl/maps/a7HbSB2HHF7PZyTb6","https://goo.gl/maps/9xcip1Z3c5t9ey1LA", "https://goo.gl/maps/xRqBwzNpPtjLjVjj6"]
    var img = document.createElement("ion-img")

    var item = items[Math.floor(Math.random()*items.length)]
    
    img.addEventListener("click", (e) =>{
      console.log(items.indexOf(item))
      window.open(addr[items.indexOf(item)])
    })
    img.setAttribute("src", item)
    document.getElementById("ad")?.appendChild(img);

}

function change(team:any){

  history.push('/teamInfo/'+`${team.name}`);

}

  useEffect(() => {
    loadData()
  }, [])
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start" id = "bckBtn">
                <IonBackButton defaultHref="home"></IonBackButton>
            </IonButtons>
          <IonTitle>Fixtures</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class='chipCard'>
            <IonChip color={'primary'}><IonLabel>Slot 1: 10:00 AM to 12:00 PM</IonLabel></IonChip>
            <IonChip color={'secondary'}><IonLabel>Slot 2: 12:00 PM to 02:00 PM</IonLabel></IonChip>
            <IonChip color={'success'}><IonLabel>Slot 3: 02:00 PM to 04:00 PM</IonLabel></IonChip>
        </IonCard>
        <IonCard id='listCard'>
            <IonList id="dates">
                <IonItem color={'medium'} key={'dates'}>Dates</IonItem>
            </IonList>
            <IonList id='team1ID'>
                <IonItem color={'medium'} key={"team1"} >Team 1</IonItem>
            </IonList>
            <IonList id='team2ID'>
                <IonItem color={'medium'} key={"team2"}>Team 2</IonItem>
            </IonList>
        </IonCard>
        <IonCard id="ad"></IonCard>
      </IonContent>
    </IonPage>  
  );
};
export default Fixtures;
