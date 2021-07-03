import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { IconButton } from "@material-ui/core";
import "./ButtonMenu.css";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useStateValue } from "./StateProvider";
import { actionTypes } from './reducer';
import { useHistory } from 'react-router-dom';
// Original design here: https://github.com/siriwatknp/mui-treasury/issues/777

const MenuButton = () => {

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{}, dispatch] = useStateValue();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSession = () => {
    return firebase.auth().signOut().then(result => {

      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });

      history.push(`/app`);
    }, function(error) {
      alert(error);
    });
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem className="Menuit" onClick={closeSession}>
        Log out
      </MenuItem>

      </Menu>
    </div>
  );
};

export default MenuButton
// <MenuItem onClick={handleClose}></MenuItem>
