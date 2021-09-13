import { makeStyles } from '@material-ui/core';
import logo from 'assets/img/bi_img01.png';

const useStyles = makeStyles({
  container: {
    paddingTop: '10vh',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '300px',
    height: '300px',
    objectFit: 'contain',
  },
  loginButtonBox: {
    marginTop: '20px',
  },
  loginButton: {
    boxSizing: 'border-box',
    width: '300px',
    height: '40px',
    fontSize: '1.1rem',
    backgroundColor: '#0D82CB',
    color: 'white',
    borderStyle: 'none',
    borderRadius: '3px',
  },
  error: {
    color: 'red',
    fontSize: '0.7rem',
  },
});

const Login = () => {
  const classes = useStyles();

  const handleLoginClick = () => {
    window.location.href = `${
      process.env.REACT_APP_CHECKIN_API_URL
    }/user/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.logoBox}>
        <img src={logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.loginButtonBox}>
        <button className={classes.loginButton} onClick={handleLoginClick}>
          42 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
