import { grayColor } from 'assets/jss/material-dashboard-react.js';
import { hexToRgb } from 'assets/jss/material-dashboard-react';
import { makeStyles } from '@material-ui/core/styles';

const { whiteColor } = require('assets/jss/material-dashboard-react');

export const styles = {
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
  },
  input: {
    margin: '0px',
    marginRight: '5px',
    fontSize: '1.1rem',
    borderWidth: '0px 0px 1px 0px',
    borderRadius: '0',
    padding: '0',
    width: '100%',
  },
  cardBody: {
    display: 'flex',
  },
};

export const useStyles = makeStyles(styles);
