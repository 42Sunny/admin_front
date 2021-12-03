import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '1.0rem',
    padding: '0.5rem 10rem',
  },
  title: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  content: {
    fontSize: '2.2rem',
    textAlign: 'center',
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
