import { makeStyles } from '@material-ui/core';
import { whiteColor, grayColor } from 'assets/jss/material-dashboard-react.js';

const styles = {
  title: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  content: {
    height: '40vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::webkit-scrollbar': {
      width: '0.3rem',
      background: 'black !important',
    },
    '&::webkit-scrollbar-thumb': {
      width: '0.3rem',
      background: 'black !important',
    },
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
