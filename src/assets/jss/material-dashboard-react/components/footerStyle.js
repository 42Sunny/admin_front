import { defaultFont, primaryColor, grayColor } from 'assets/jss/material-dashboard-react.js';

const footerStyle = {
  footer: {
    bottom: '0',
    borderTop: '1px solid ' + grayColor[11],
    ...defaultFont,
  },
  container: {
    color: primaryColor,
    textDecoration: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '0.9rem',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
  item: {
    display: 'flex',
    '& > div:nth-child(1)': {
      width: '30%',
    },
    '& > div:nth-child(2)': {
      width: '70%',
    },
    '& a': {
      textDecoration: 'none',
      color: primaryColor,
    },
  },
};
export default footerStyle;
