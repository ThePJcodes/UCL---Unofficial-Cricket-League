import { IonContent,useIonAlert, IonHeader, IonList, IonPage, IonTitle, IonItem, IonLabel, IonInput, IonToolbar, IonButton,IonSelect, IonSelectOption, IonButtons, IonBackButton, IonCard, IonText} from '@ionic/react';
import './signup.css'
import Tab3 from './Login'
import { useState } from 'react';

import {useHistory} from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


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
const auth = getAuth();

const SignUp: React.FC = () => {

  const [email, setEmail] = useState("");
  const[pass, setPass] = useState("");
  const[passRe, setPassRe] = useState("");
  const[name, setName] = useState("");
  const[year, setYear] = useState(0);
  const[branch, setBranch] = useState("")
  const[passError, setPassError] = useState("");
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  function passcheck() {
              if (passRe != pass && pass != "" && passRe != "") {
                  setPassError("The password's do not match!");
              }else{
                setPassError("");
              }
    
  }

  function signup(){

    if(email == ""){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please enter your Email',
        buttons: ['OK'],
      })
    }else if(pass == ""){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please enter your Password',
        buttons: ['OK'],
      })
    }else if(passRe == ""){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please re-enter your Password',
        message: 'Please re-enter your password to confirm',
        buttons: ['OK'],
      })
    }else if(name == ""){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please enter your Name',
        message: 'So we can identify you! ;)',
        buttons: ['OK'],
      })
    }else if(year == null){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please select your year of study!',
        buttons: ['OK'],
      })
    }else if(branch == ""){
      presentAlert({
        header: 'Alert',
        subHeader: 'Please select your branch',
        buttons: ['OK'],
      })
    }else{
      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        setup(uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        if(errorCode == 'auth/invalid-email'){
          presentAlert({
            header: 'Alert',
            subHeader: 'Invalid Email',
            message: 'Please make sure you have entered a valid Email Address!',
            buttons: ['OK'],
          })

        }else if(errorCode == "auth/weak-password"){
          presentAlert({
            header: 'Alert',
            subHeader: 'Invalid Password',
            message: 'Please make sure the password has atleast 6 characters!',
            buttons: ['OK'],
          })
        }
        // ..
      });
    }
  }

  async function setup(uid:any) {
    const querySnapshot = await getDocs(collection(db, "Users"));
    await setDoc(doc(db, "Users", uid), {
      Name: `${name}`,
      Year: `${year}`,
      Branch: `${branch}`
    });
    history.push('/profile');
  }

    return (
      <IonPage>
      <IonHeader>
         <IonToolbar>
         <IonButtons slot="start" class="toolBtn">
                <IonBackButton defaultHref="login" class='toolBtn'></IonBackButton>
            </IonButtons>
           <IonTitle>Sign Up!</IonTitle>
         </IonToolbar>
       </IonHeader>
       <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel class = "laleb" position="stacked">Email ID*</IonLabel>
            <IonInput placeholder="yourname@gmail.com" autocomplete='email' inputMode='email' required onIonChange={(e:any)=>setEmail(e.target.value) }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel class = "laleb" position="stacked">Password*</IonLabel>
            <IonInput placeholder="somethingcool#111" type='password' required onIonChange={(e:any)=>setPass(e.target.value)} onIonBlur = {()=>passcheck()}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel class = "laleb" position="stacked">Re-Enter Password*</IonLabel>
            <IonInput placeholder="somethingcool#111" type='password' required onIonChange={(e:any)=> setPassRe(e.target.value)} onIonBlur = {()=>passcheck()}></IonInput>
            <IonText>{passError}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel class = "laleb" position="stacked">UserName*</IonLabel>
            <IonInput placeholder="Cool Crickster!" type='text' required onIonChange={(e:any)=>setName(e.target.value) }></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel class = "laleb" position='stacked' >Choose your year of Study*</IonLabel>
            <IonSelect placeholder="Select Year" aria-required onIonChange={(e:any)=>setYear(e.target.value) }>
              <IonSelectOption value="1">1st Year</IonSelectOption>
              <IonSelectOption value="2">2nd Year</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel class = "laleb" position='stacked'>Choose your Branch*</IonLabel>
            <IonSelect placeholder="Select Branch" aria-required onIonChange={(e:any)=>setBranch(e.target.value) }>
              <IonSelectOption value="Computer Science and Engineering">CSE</IonSelectOption>
              <IonSelectOption value="Computer Science and Design">CSD</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton onClick={signup} id="signBtn">Sign Up!</IonButton>
        </IonList>
       </IonContent>
   </IonPage>
    );
};

export default SignUp;