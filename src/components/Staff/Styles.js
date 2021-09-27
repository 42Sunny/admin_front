import { hexToRgb } from 'assets/jss/material-dashboard-react';
import { grayColor } from 'assets/jss/material-dashboard-react';

const { makeStyles } = require('@material-ui/core');
const { whiteColor } = require('assets/jss/material-dashboard-react');

export const useStyles = makeStyles({
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
  cardCategoryWhite: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
  },
  StaffInputBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
  inputButton: {
    margin: '0px',
  },
  cardBodyHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButtonBox: {
    backgroundColor: 'white',
    border: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#ff3838',
    '&:hover': {
      color: '#1CBCD0',
    },
  },
  deleteButton: {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    border: 'none',
    color: '#ff3838',
    '&:hover': {
      color: '#ffaaaa',
    },
    '&:click': {
      color: '#ff3838',
    },
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: '0px 0px 1px 0px',
    borderRadius: '0',
  },
  addButton: {
    color: '#1cbcd0',
    padding: '14px',
    '&:hover': { color: '#5ac2ce' },
    '&:click': { color: '#1cbcd0' },
  },
});
