const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  description: {
    color: 'grey',
    backgroundColor: 'rgba(0,0,0,0)',
    borderStyle: 'none',
    borderRadius: '0.3rem',
    padding: '0.3rem',
    '&:hover': {
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  controller: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '& > button': {
      backgroundColor: 'rgba(0,0,0,0)',
      borderStyle: 'none',
      borderRadius: '50%',
      fontSize: '1.3rem',
      color: 'grey',
    },
    '& > button:hover': {
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
});
