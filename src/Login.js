import React from "react";
import "./Login.css";
import { Button } from '@material-ui/core';
import {auth, provider} from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from './reducer';
import firebase from 'firebase/app';
import 'firebase/auth';

function Login({history}) {
    const [{}, dispatch] = useStateValue();

    function signIn(){

      return firebase.auth().signInWithPopup(provider).then(result => {
        dispatch({
         type: actionTypes.SET_USER,
         user: result.user,
        })
      }).catch(error => alert(error.message));

    }

    return (
        <div className="login">
          <div className="login_container">
            <div className="Login_text">
              <h1>Sign in to get started</h1>
            </div>
            <Button type="submit" onClick={signIn}>
              <div className="l"></div>
              Sign in with Google
            </Button>
          </div>
        </div>
    )
}

export default Login
