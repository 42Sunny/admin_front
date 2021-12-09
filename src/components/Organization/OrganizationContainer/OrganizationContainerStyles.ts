import { makeStyles } from '@material-ui/core';

const styles = {
  title: {
    fontSize: '1.3rem',
  },
  body: {
    display: 'flex',
    gap: '0.7rem',
    'flex-direction': 'row',
  },
};

const useOrganizationContainerStyles = makeStyles(styles);

export default useOrganizationContainerStyles;
