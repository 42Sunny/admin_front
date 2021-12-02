import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    padding: '0px 0px 0px 0px',
    margin: '0px 5px 0px 5px',
    borderWidth: '0px 0px 0px 0px',
    borderRadius: '0',
    fontSize: '0.9rem',
    width: '100%',
  },
  body: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'grey',
    borderRadius: '5px',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
  },
});
