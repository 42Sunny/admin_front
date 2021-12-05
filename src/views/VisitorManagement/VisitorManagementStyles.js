import { makeStyles } from '@material-ui/core';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  datePicker: {
    backgroundColor: 'rgba(255, 255, 255 ,0)',
    borderStyle: 'none',
    color: 'white',
    fontFamily: 'Spoqa Han Sans Neo',
    padding: '0rem',
    margin: '0px',
    fontSize: '1.2rem',
    boxSizing: 'border-box',
  },
  datePickerBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchBox: {
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
  searchInput: {
    borderStyle: 'none',
    fontSize: '0.9rem',
    padding: '0',
  },
  searchSelect: {
    borderStyle: 'none',
    fontSize: '0.9rem',
  },
  searchIcon: {
    fontSize: '1.7rem',
    borderRadius: '0.3rem',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(0,0,0,0.3)',
      transition: '0.5s',
    },
  },

  bodyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  placeSelect: {
    borderStyle: 'none',
    fontSize: '14px',
    color: '#00ACC1',
    fontWeight: 'bold',
  },

  statueSelect: {
    borderStyle: 'none',
  },

  pageSelectBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.3rem',
  },
  pageSelectButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderStyle: 'none',
    borderRadius: '0.3rem',
    fontSize: '1.1rem',
    '&:active': {
      backgroundColor: '#1a1a1a',
    },
    '&:hover': {
      backgroundColor: '#cacaca',
    },
  },
  pageSelectContent: { fontSize: '1.3rem' },
  cardBody: {
    minHeight: '650px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
