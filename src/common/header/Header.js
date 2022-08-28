import React, { useState ,useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import "./Header.css";
import logo from "../../assets/logo.svg";
import { Typography } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import ModalContainer from '../modal/ModalContainer';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

function Header(props) {
  // const history = useHistory();
  const { classes } = props;
  const [showModal, setShowModal] = useState(false);
  // const [isLogin, setIslogin] = useState(false);

  let auth = window.sessionStorage.getItem('access-token');

  const onOpenModal = () => {
    setShowModal(true);
  }
  const onCloseModal = () => {
    setShowModal(false);
  }

  const LogoutReq = async()=>{
    await fetch("/api/v1/auth/logout",{
      method: 'POST',
      headers: {
          authorization: `Basic ${auth}`
      }
    })
  }

  useEffect(() => {
    console.log(props.baseUrl);
  }, []);

  const onLogoutReq = ()=>{
    LogoutReq();
    window.sessionStorage.clear();
    // history(-1);
  }

  let button;

  if (auth == null) {
    button = <Button id="login-btn" variant="contained" color="default" onClick={() => onOpenModal()}>Login</Button>;
  } else {
    button = <Link to="/" style={{ textDecoration: 'none' }}> <Button id="login-btn" variant="contained" color="default" onClick={() => onLogoutReq()}>Logout</Button> </Link>;
  }

  let bookButton;
  if(props.baseUrl.includes('movie')){
    if(auth == null){
      bookButton = <Button id="bookshow-btn" variant="contained" color="primary" onClick={() => onOpenModal()}>Book Show</Button>;
    }
    else{
      bookButton = <Link to={`/bookshow/${props.id}`} style={{ textDecoration: 'none' }}><Button id="bookshow-btn" variant="contained" color="primary" >Book Show</Button></Link>;
    }
  }else{
    bookButton = <span></span>;
  } 

  return (
    <div className={classes.root}>
      <div>
        <AppBar className='appbar' position="static">
          <Toolbar className='appbar-toolbar'>
            <img className="appbar-logo" src={logo} alt="React logo" />
            <Typography variant="h6" color="inherit" className={classes.grow} />
            {bookButton}
            {button}
          </Toolbar>
        </AppBar>
      </div>

      <Modal className="modal" open={showModal} onClose={() => onCloseModal()} center>
        <ModalContainer onCloseModal={onCloseModal} />
      </Modal>


    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
