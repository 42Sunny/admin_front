import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    fontSize: '1.3rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    gap: '0.7rem',
    'flex-direction': 'row',
  },
  addCompany: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    gap: '0.3rem',
    backgroundColor: 'rgba(0,0,0,0)',
    borderStyle: 'none',
    color: 'white',
    '&:hover': {
      opacity: '0.7',
    },
    '&:active': {
      opacity: '0.5',
      transition: '0.3s',
    },
  },
  addIcon: {
    color: 'white',
  },
  modalContainer: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
  },
  modalHeader: {
    display: 'flex',
    padding: '0.7rem',
    margin: 0,
    fontSize: '1.3rem',
    justifyContent: 'space-between',
  },
  modalBody: {
    display: 'flex',
    gap: '0.5rem',
    padding: '2rem',
  },
  modalExit: {
    color: 'white',
  },
};

const useCompanyInfoContainerStyles = makeStyles(styles);

export default useCompanyInfoContainerStyles;
