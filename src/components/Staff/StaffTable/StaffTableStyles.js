import { grayColor } from 'assets/jss/material-dashboard-react';
const { makeStyles } = require('@material-ui/core');
const { whiteColor } = require('assets/jss/material-dashboard-react');

export const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  body: { height: '85vh' },
  bodyHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
