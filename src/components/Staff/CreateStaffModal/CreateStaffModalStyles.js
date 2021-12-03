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
    color: whiteColor,
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
  submitButton: {
    margin: '0px',
  },
  exitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'none',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    '&:hover': {
      color: 'rgba(255,255,255,0.6)',
    },
  },
  error: {
    color: 'red',
    paddingLeft: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
