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
  },
  addIcon: {
    color: 'white',
  },
};

const useCompanyInfoContainerStyles = makeStyles(styles);

export default useCompanyInfoContainerStyles;
