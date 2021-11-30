import { makeStyles } from '@material-ui/core/styles';
import { grayColor } from 'assets/jss/material-dashboard-react';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.3rem',
    padding: '0 0.7rem',
  },
  graphTitle: {
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
  graphBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.2rem',
  },
};

export const useStyles = makeStyles(styles);
