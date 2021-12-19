import { updateVisitorStatus } from 'API/visitor/info';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import React, { useContext } from 'react';
import useStyles from './CheckoutButtonStyles';

type PropTypes = {
  visitorId: string;
  status: string;
};

const CheckoutButton = ({ visitorId, status }: PropTypes) => {
  const classes = useStyles();
  const { reloadData } = useContext(VisitorManagementContext);

  const handleClick = async () => {
    if (window.confirm('퇴실 처리하시겠습니까?')) {
      await updateVisitorStatus(visitorId, '퇴실');
      reloadData();
    }
  };

  return status === '입실' ? (
    <button className={classes.button} onClick={handleClick}>
      퇴실
    </button>
  ) : null;
};

export default CheckoutButton;
