const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles({
  icon: {
    color: 'white',
  },
  button: {
    appearance: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    '&:hover': { opacity: '0.7' },
  },
  text: {
    margin: '0px 5px 0px 0px',
    color: 'white',
    fontSize: '0.9rem',
  },
});
