import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, where , orderBy } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue, query, orderByChild, update } from "firebase/database";



import './teams.scss'
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
const Points: React.FC<UserDetailPageProps> = ({ match }) => {
  const history = useHistory();

const [group, setGroup] = useState("");
const [teams, setTeams] = useState(["Loading!"]);
const [item, setItem] = useState("");

const loadData = async() => {

  const dbRef = query(ref(database,"Teams"),orderByChild('Points'))
  teams.shift();
  onValue(dbRef, (snap) =>{
    snap.forEach((team) =>{
      const dataRef = ref(database,`Teams/${team.key}`);
      onValue(dataRef,(snapshot) =>{
        if(snapshot.val().Group == match.params.id){
          setTeams(arr => [...arr, `${team.key}`] );
          var table = document.getElementById("table");
          var row = document.createElement("tr");
          var name = document.createElement("td");
          var played = document.createElement("td");
          var won = document.createElement("td");
          var draw = document.createElement("td");
          var points = document.createElement("td");
          var nrr = document.createElement("td");
          name.innerHTML = `${team.key}`;
          name.className = 'tableName'
          played.innerHTML = snapshot.val().Played;
          won.innerHTML = snapshot.val().Wins;
          draw.innerHTML = snapshot.val().Draws;
          points.innerHTML = (snapshot.val().Points*-1).toString();
          nrr.innerHTML = snapshot.val().NRR;
          row.innerHTML = "";
          row.appendChild(name);
          row.appendChild(played);
          row.appendChild(won);
          row.appendChild(draw);
          row.appendChild(points);
          row.appendChild(nrr);
          table?.appendChild(row);
        }
      })
    })

    function sortTable() {
      var table, rows, switching, i, x, y,xtemp, ytemp, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("tabe") as HTMLTableElement;
      switching = true;
      // Set the sorting direction to ascending:
      dir = "desc";
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        if(table){
          rows = table.rows;
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[4];
            y = rows[i + 1].getElementsByTagName("TD")[4];

            xtemp = rows[i].getElementsByTagName("TD")[5];
            ytemp = rows[i + 1].getElementsByTagName("TD")[5];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }else if(x.innerHTML.toLowerCase() == y.innerHTML.toLowerCase()){
                console.log((parseFloat(xtemp.innerHTML) + " and " + parseFloat(ytemp.innerHTML)));
                if((parseFloat(xtemp.innerHTML)<parseFloat(ytemp.innerHTML))){
                  shouldSwitch = true;
                  break;
                }
              }
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            if(rows[i]){
              rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
            }
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
          } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
    }

    sortTable();
  })

  // const q = query(collection(db, `Teams`), orderBy("Points"));
  // const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         if(doc.id == `${match.params.id}`){
  //           console.log("bruh");
  //           teams.shift();
  //           setTeams(arr => [...arr, `${doc.data().Players}`] );
  //         }else if(doc.data().Group == `${match.params.id}`){
  //               //console.log(doc.id, " => ", doc.data());
  //               teams.shift();
  //                setTeams(arr => [...arr, `${doc.id}`] );

  //                var table = document.getElementById("table");
  //                var row = document.createElement("tr");
  //                var name = document.createElement("td");
  //                var played = document.createElement("td");
  //                var won = document.createElement("td");
  //                var draw = document.createElement("td");
  //                var points = document.createElement("td");
  //                var nrr = document.createElement("td");
  //                name.innerHTML = doc.id;
  //                console.log(doc.data().played)
  //                played.innerHTML = doc.data().Played;
  //                won.innerHTML = doc.data().Wins;
  //                draw.innerHTML = doc.data().Draws;
  //                points.innerHTML = (doc.data().Points*-1).toString();
  //                nrr.innerHTML = doc.data().NRR;
  //                row.innerHTML = "";
  //                row.appendChild(name);
  //                row.appendChild(played);
  //                row.appendChild(won);
  //                row.appendChild(draw);
  //                row.appendChild(points);
  //                row.appendChild(nrr);
  //                table?.appendChild(row);
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
          <table id="tabe">
            <thead>
            <tr>
            <th style={{width:"175%"}}>Teams</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th style={{width:"125%"}}>Points</th>
            <th>NRR</th>
            </tr>
            </thead>
            <tbody id="table">
            </tbody>
          </table>
        </IonList>
        <IonImg src={require('D:/Ionic/Apps/ucl-world/src/resources/bg-1.png')} />

      </IonContent>
    </IonPage>  
  );
};
export default Points;
