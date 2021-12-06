import { updateVisitorStatus } from 'api/visitorApi';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import React, { useContext } from 'react';
import useStyles from './CheckinButtonStyles';

type PropTypes = {
  visitorId: string;
  status: string;
};

const CheckinButton = ({ visitorId, status }: PropTypes) => {
  const classes = useStyles();
  const { reloadData } = useContext(VisitorManagementContext);

  const handleClick = async () => {
    if (window.confirm('입실 시키겠습니까?')) {
      await updateVisitorStatus(visitorId, '입실');
      reloadData();
    }
  };

  return status === '대기' ? (
    <button className={classes.button} onClick={handleClick}>
      입실
    </button>
  ) : null;
};

export default CheckinButton;
