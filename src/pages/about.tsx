import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonApp, IonFooter, IonList, IonButtons, IonBackButton, IonItem, IonRouterOutlet} from '@ionic/react';
import {IonImg,IonSegment, IonSegmentButton, IonNavLink,IonFab, IonFabButton, IonIcon, createAnimation,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import { debug } from 'console';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { logoGithub, logoInstagram } from 'ionicons/icons';
import { initializeApp } from "firebase/app";
import { arrayRemove, getFirestore } from "firebase/firestore";
import { collection,getDocs, addDoc, onSnapshot, doc, where , orderBy } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, onValue, query, orderByChild, update } from "firebase/database";
import './Home.scss'
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



  interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const about: React.FC<UserDetailPageProps> = ({ match }) => {
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start" id = "bckBtn">
                <IonBackButton defaultHref="home"></IonBackButton>
            </IonButtons>
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList class = "cards">
          <IonItem>
            <IonCard style={{width:"100%"}}>
                <IonCardHeader>
                    <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee"}}>UCL World</IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{textAlign:"center"}}>
                  <IonText style={{textAlign:"center",fontFamily:"Bungee",fontStyle:"italic",color:"#eb445a", fontSize:"4vw"}}>"From the Ground to the Clouds"</IonText>
                  <br></br>
                  <IonText style={{fontSize:"4vw"}}>A platform that represents us, the players of sports on a local level, We at UCL World believe that each and every player is equally worthy of a level of standard in this digital age!</IonText>
                </IonCardContent>
            </IonCard>
          </IonItem>

          <IonItem style={{width:"100%", margin:"0"}}>
            <IonCard style={{width:"100%",  margin:"0"}}>
              <IonCardHeader>
              <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee", fontSize:"6vw"}}>Meet Our Team</IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{padding:"0"}}>
                <IonList>
                  <IonItem>
                  <IonCard style={{width:"100%"}}>
                      <IonCardHeader>
                      <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee"}}>
                          Dhruv Modi
                        </IonCardTitle>
                        <IonFab horizontal="end">
                          <IonFabButton color="light" onClick={() =>{window.open("https://github.com/Varniro")}}>
                            <IonIcon icon={logoGithub}></IonIcon>
                          </IonFabButton>
                        </IonFab>
                      </IonCardHeader>
                      <IonCardContent style={{textAlign:"center"}}>
                        <IonImg style={{margin:"2vw"}} src={require("D:/Ionic/Apps/ucl-world/src/resources/dhruv.jpeg")}></IonImg>
                        <IonText style={{fontSize:"4vw", marginTop:"2vw"}}>Head of development and reponsible for the tech and data side of the platform.</IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>

                  <IonItem>
                  <IonCard style={{width:"100%"}}>
                      <IonCardHeader>
                      <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee"}}>
                          Pranjal Dubey
                        </IonCardTitle>
                        <IonFab horizontal="end">
                          <IonFabButton color="dark" onClick={() =>{window.open("https://www.instagram.com/the_pj9/")}}>
                            <IonIcon icon={logoInstagram}></IonIcon>
                          </IonFabButton>
                        </IonFab>
                      </IonCardHeader>
                      <IonCardContent style={{textAlign:"center"}}>
                        <IonImg style={{margin:"2vw"}} src={require("D:/Ionic/Apps/ucl-world/src/resources/PJ.jpeg")}></IonImg>
                        <IonText style={{fontSize:"4vw", marginTop:"2vw"}}>Head of Design and Activities, responsible for the quality assurance and smooth functioning of the leagues and platform.</IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>

                  <IonItem>
                  <IonCard style={{width:"100%"}}>
                      <IonCardHeader>
                      <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee"}}>
                          Raman Sharma
                        </IonCardTitle>
                        <IonFab horizontal="end">
                          <IonFabButton color="light" onClick={() =>{window.open("https://www.instagram.com/ramansharma_0666/")}}>
                            <IonIcon icon={logoInstagram}></IonIcon>
                          </IonFabButton>
                        </IonFab>
                      </IonCardHeader>
                      <IonCardContent style={{textAlign:"center"}}>
                        <IonImg style={{margin:"2vw"}} src={require("D:/Ionic/Apps/ucl-world/src/resources/raman.jpeg")}></IonImg>
                        <IonText style={{fontSize:"4vw", marginTop:"2vw"}}>Head of Management and the UCL Crew, Responsible for the inner workings of the platform and leagues.</IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonItem>

          <IonItem>
            <IonCard style={{width:"100%"}}>
              <IonCardHeader>
                <IonCardTitle style={{textAlign:"center",fontFamily:"Bungee"}}>Meet the Crew!</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonText>Aditya Kumar Tiwari</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Apoorv Dixit</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Chanchal Gupta</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Chirag Jain</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Dhruv Parashar</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Nihal Sharma</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Piyush Sanwale</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Prashoon Sharma</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Raj Patel</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Shantanu Dixit</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Rahul Rathore</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Praveen Kumar Baghel</IonText>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>  
  );
};
export default about;
