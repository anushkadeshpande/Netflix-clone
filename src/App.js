import React,{ useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import { auth } from './firebase';
import { useDispatch , useSelector } from "react-redux";
import { logout, login, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) =>{
        if (userAuth){
          //logged in
          dispatch(login({
            uid:userAuth.uid,
            email:userAuth.email,
          }));
        }
        else{
          //logged out
          dispatch(logout());
        }
      });
      return unsubscribe;
    },[dispatch])
  return (
    <div className="app">
  
     <Router>
     {!user? (
       <LoginScreen/>
     ) : (

       <Switch>
         <Route exact path='/' component={HomeScreen} />
         <Route path='/profile' component={ProfileScreen} />
       </Switch>
     )
    }
    </Router>
    </div>
  );
}

export default App;
