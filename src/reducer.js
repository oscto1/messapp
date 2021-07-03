// import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import firebase from 'firebase/app';
import 'firebase/auth';

export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch(action.type){
    case actionTypes.SET_USER:
      return{
        ...state,
        user: action.user,
      };
      default:
        return state;
  }
};

export default reducer;
