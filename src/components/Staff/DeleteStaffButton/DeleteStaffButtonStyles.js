const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles({
  container: {
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
  button: {
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0,0)',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.6)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '&:click': {
      color: 'rgba(0, 0, 0, 0.9)',
    },
  },
});
