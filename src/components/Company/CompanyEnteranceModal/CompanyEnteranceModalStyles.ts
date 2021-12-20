import { makeStyles } from '@material-ui/core';

const styles = {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalExit: {
    color: 'white',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '4rem',
  },
  radio: {
    margin: '0.3rem',
  },
};

const useCompanyEnteranceModalStyles = makeStyles(styles);

export default useCompanyEnteranceModalStyles;
