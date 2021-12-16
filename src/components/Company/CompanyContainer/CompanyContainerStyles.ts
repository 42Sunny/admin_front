import { makeStyles } from '@material-ui/core';

const styles = {
  header: {
    width: '100%',
  },
  container: {
    height: '600px',
    'box-sizing': 'border-box',
  },
  body: {
    display: 'flex',
    'flex-direction': 'column',
  },
  bodyHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const useCompanyContainerStyles = makeStyles(styles);

export default useCompanyContainerStyles;
