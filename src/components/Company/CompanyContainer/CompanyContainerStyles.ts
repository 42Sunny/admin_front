import { makeStyles } from '@material-ui/core';

const styles = {
  header: {
    width: '100%',
  },
  container: {
    height: '600px',
    'box-sizing': 'border-box',
  },
  body: {},
};

const useCompanyContainerStyles = makeStyles(styles);

export default useCompanyContainerStyles;
