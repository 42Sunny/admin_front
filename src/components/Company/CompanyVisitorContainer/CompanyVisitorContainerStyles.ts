import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    fontSize: '1.3rem',
    display: 'flex',
    width: '100%',
    height: '2.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {},
  datePicker: {},
  dateInput: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: '1.0rem',
    padding: '0rem',
    borderStyle: 'none',
    'box-sizing': 'border-box',
    fontFamily: 'Spoqa Han Sans Neo',
  },
};

const useCompanyVisitorContainerStyles = makeStyles(styles);

export default useCompanyVisitorContainerStyles;
