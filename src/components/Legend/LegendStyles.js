import { makeStyles } from '@material-ui/core/styles';
import { infoColor } from 'assets/jss/material-dashboard-react';

const styles = {
  legendBox: {
    padding: '1.3rem',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.33rem',
  },
  legendColor: {
    width: '0.7rem',
    height: '0.7rem',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoLegendColor: {
    backgroundColor: infoColor[1],
  },
};

export const useStyles = makeStyles(styles);
