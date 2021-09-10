import React, { useContext } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
// core components
import Button from 'components/CustomButtons/Button.js';
import Icon from '@material-ui/core/Icon';

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { LoginContext } from 'contexts/LoginContext';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const { setIsLogin } = useContext(LoginContext);
  const handleClickProfile = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      document.cookie =
        process.env.REACT_APP_AUTH_KEY + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
      setIsLogin(false);
      // window.localStorage.setItem('isLogin', false);
    }
  };
  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          logout
        </Button>
      </div>
    </div>
  );
}
