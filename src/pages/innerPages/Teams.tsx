import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue } from "firebase/database";


import './teams.scss'
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
const Teams: React.FC<UserDetailPageProps> = ({ match }) => {
  const history = useHistory();

const [group, setGroup] = useState("");
const [teams, setTeams] = useState(["Loading!"]);
const [item, setItem] = useState("");

const loadData = async() => {

  var dbRef = ref(database, "Teams");

  teams.shift();


  onValue(dbRef, (snap) =>{
    for(const team in snap.val()){
      get(child(dbRef, `${team}/Group`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          if(snapshot.val() == match.params.id){
            setTeams(arr => [...arr, team ])
          }
        }
      });
    }
  })

  // console.log(match.params.id);

  // const querySnapshot = await getDocs(collection(db, "Teams"));
  //       querySnapshot.forEach((doc) => {
  //         if(doc.id == `${match.params.id}`){
  //           console.log("bruh");
  //           setTeams(arr => [...arr, `${doc.data().Players}`] );
  //         }else if(doc.data().Group == `${match.params.id}`){
  //               //console.log(doc.id, " => ", doc.data());
  //               teams.shift();
  //                setTeams(arr => [...arr, `${doc.id}`] );
  //           }
  //         });

}

function change(team:any){

  history.push('/teamInfo/'+`${team.name}`);
}

  useEffect(() => {
    loadData()

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

  }, [])

  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start" id = "bckBtn">
                <IonBackButton defaultHref="home"></IonBackButton>
            </IonButtons>
          <IonTitle>Group {match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList class = "cards">
          <IonItem id = "ad"></IonItem>
          {teams.map(name => (
            <IonItem key = {name} class = "teamNames" ><IonText onClick={()=>change({name})}>{name}</IonText></IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>  
  );
};
export default Teams;
