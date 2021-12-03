import { hexToRgb } from 'assets/jss/material-dashboard-react';
import { grayColor } from 'assets/jss/material-dashboard-react';

const { makeStyles } = require('@material-ui/core');
const { whiteColor } = require('assets/jss/material-dashboard-react');

export const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
  subTitle: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
  },
  input: {
    margin: '0px',
    marginRight: '5px',
    fontSize: '0.9rem',
    borderWidth: '0px 0px 1px 0px',
    borderRadius: '0',
    padding: '0',
    width: '100%',
  },
  button: {
    margin: '0px',
  },
  error: {
    color: 'red',
    paddingLeft: '20px',
  },
});
