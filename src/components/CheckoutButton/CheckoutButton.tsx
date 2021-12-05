import { getVisitorLogs, updateVisitorStatus } from 'api/visitorApi';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import React, { useContext } from 'react';
import useStyles from './CheckoutButtonStyles';

type PropTypes = {
  visitorId: string;
  status: string;
};

const CheckoutButton = ({ visitorId, status }: PropTypes) => {
  const classes = useStyles();
  const { startDate, endDate, setVisitData, page, setLastPage } =
    useContext(VisitorManagementContext);

  const handleClick = async () => {
    if (window.confirm('퇴실 시키겠습니까?')) {
      await updateVisitorStatus(visitorId, '퇴실');
      const res = await getVisitorLogs({ start: startDate, end: endDate, page });
      setVisitData(res.data.checkInLogs);
      setLastPage(res.data.lastPage);
    }
  };

  return status === '만료' || status === '퇴실' ? null : (
    <button className={classes.button} onClick={handleClick}>
      퇴실
    </button>
  );
};

export default CheckoutButton;
