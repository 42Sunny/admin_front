import { makeStyles } from '@material-ui/core';

const styles = {
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderStyle: 'none',
    '&:hover': {
      opacity: '0.5',
    },
    '&:active': {
      opacity: '0.3',
      transition: '0.3s',
    },
  },
};

const useIconButtonStyles = makeStyles(styles);

export default useIconButtonStyles;
