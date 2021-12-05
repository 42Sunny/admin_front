import { updateVisitorStatus } from 'api/visitorApi';
import React from 'react';
import useStyles from './CheckoutButtonStyles';

type PropTypes = {
  visitorId: string;
};

const CheckoutButton = ({ visitorId }: PropTypes) => {
  const classes = useStyles();

  const handleClick = async () => {
    await updateVisitorStatus(visitorId, '퇴실');
  };

  return (
    <button className={classes.button} onClick={handleClick}>
      퇴실
    </button>
  );
};

export default CheckoutButton;
