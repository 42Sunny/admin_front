import { hexToRgb } from 'admin/assets/jss/material-dashboard-react';
import { grayColor } from 'admin/assets/jss/material-dashboard-react';

const { makeStyles } = require('@material-ui/core');
const { whiteColor } = require('admin/assets/jss/material-dashboard-react');

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
  },
  customInput: {
    marginBottom: '5px',
  },
});
