import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact,useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter,  IonSegment, IonSegmentButton,IonNav, IonNavLink, IonButton, IonRippleEffect } from '@ionic/react';


import React, { useEffect } from "react";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Home from './pages/Home';
import Teams from './pages/innerPages/Teams'
import Tab3 from './pages/Login';
import Profile from './pages/innerPages/profile';
import SignUp from './pages/signup';
import TeamsInfo from './pages/innerPages/teamInfo';
import Datain from './pages/innerPages/datainput';
import PlayerInfo from './pages/innerPages/PlayerProfile';
import Fixtures from './pages/innerPages/fixtures';
import PointsTable from './pages/innerPages/pointsTable';
import about from './pages/about'
import hghest from './pages/innerPages/highest'
import Highest from './pages/innerPages/highest';

setupIonicReact();

const App: React.FC = () => {


  return(

  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
        <Route path="/teams/:id" component={Teams}/>
        <Route path="/login" component={Tab3}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/teamInfo/:id" component={TeamsInfo}/>
        <Route path='/data' component={Datain}/>
        <Route path="/playerInfo/:id" component={PlayerInfo}/>
        <Route path="/fixtures" component={Fixtures}></Route>
        <Route path="/points/:id" component={PointsTable}></Route>
        <Route path="/about" component={about}></Route>
        <Route path="/highest" component={Highest}></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
  };

export default App;
