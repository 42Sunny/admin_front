import { makeStyles } from '@material-ui/core/styles';
import { whiteColor, grayColor } from 'assets/jss/material-dashboard-react.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  cardTitleWhite: {
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableBody: {
    minHeight: '80vh',
    overflow: 'scroll',
  },
};

export const useStyles = makeStyles(styles);
