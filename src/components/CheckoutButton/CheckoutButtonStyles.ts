import { makeStyles } from '@material-ui/core';

const styles = {
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: '0.3rem',
    borderStyle: 'solid',
    borderWidth: '0.1rem',
    padding: '0.2rem',
    'box-sizing': 'border-box',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(0,0,0,0.3)',
      transition: '0.3s',
    },
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
