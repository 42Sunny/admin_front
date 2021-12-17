import { makeStyles } from '@material-ui/core/styles';
import { whiteColor, grayColor } from 'assets/jss/material-dashboard-react';

const styles = {
  root: {
    flexGrow: 1,
  },
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
  tableBody: {
    maxHeight: '50vh',
  },
  content: {
    height: '40vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};

export const useStyles = makeStyles(styles);
