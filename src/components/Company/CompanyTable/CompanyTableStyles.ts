import { makeStyles } from '@material-ui/core';

const styles = {
  container: {
    width: '100%',
    height: '600px',
    'overflow-y': 'auto',
    'scrollbar-gutter': 'stable',
  },
};

const useCompanyTableStyles = makeStyles(styles);

export default useCompanyTableStyles;
