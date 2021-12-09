import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    fontSize: '1.3rem',
    display: 'flex',
    width: '100%',
    'flex-direction': 'column',
    gap: '0.4rem',
  },
  title: {},
  datePicker: {
    fontSize: '1.1rem',
  },
};

const useCompanyVisitorContainerStyles = makeStyles(styles);

export default useCompanyVisitorContainerStyles;
