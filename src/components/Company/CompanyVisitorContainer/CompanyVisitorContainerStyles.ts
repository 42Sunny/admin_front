import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    fontSize: '1.3rem',
    display: 'flex',
    width: '100%',
    'flex-direction': 'column',
    gap: '0.7rem',
  },
  title: {},
  datePicker: {},
  dateInput: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: '1.2rem',
    padding: '0rem',
    borderStyle: 'none',
    borderWidth: '0.1rem',
    'box-sizing': 'border-box',
    fontFamily: 'Spoqa Han Sans Neo',
  },
};

const useCompanyVisitorContainerStyles = makeStyles(styles);

export default useCompanyVisitorContainerStyles;
