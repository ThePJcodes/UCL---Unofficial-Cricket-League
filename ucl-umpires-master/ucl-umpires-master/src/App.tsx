import { IonApp, IonRouterOutlet,IonLabel, IonRadio, IonRadioGroup, setupIonicReact, IonRippleEffect, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText , useIonViewDidEnter, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory  } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import { IonList, IonItem, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

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
import PlayerSlc from './pages/playerSelectionInitial';
import Scoring from './pages/Scoring';
import Scorer from './pages/tempScorer';
import Login from './pages/login';

setupIonicReact();



// Initialize Firebase
const App: React.FC = () => {
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route path='/playerInitial/:id' component={PlayerSlc}></Route>
          <Route path='/scoring/:id' component={Scoring}></Route>
          <Route path='/scorer/:id' component={Scorer}></Route>
          <Route path='/login' component={Login}></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;