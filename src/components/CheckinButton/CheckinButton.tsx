import { getVisitorLogs, updateVisitorStatus } from 'api/visitorApi';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import React, { useContext } from 'react';
import useStyles from './CheckinButtonStyles';

type PropTypes = {
  visitorId: string;
  status: string;
};

const CheckinButton = ({ visitorId, status }: PropTypes) => {
  const classes = useStyles();
  const { startDate, endDate, setVisitData, page, setLastPage } =
    useContext(VisitorManagementContext);

  const handleClick = async () => {
    if (window.confirm('입실 시키겠습니까?')) {
      await updateVisitorStatus(visitorId, '입실');
      const res = await getVisitorLogs({ start: startDate, end: endDate, page });
      setVisitData(res.data.checkInLogs);
      setLastPage(res.data.lastPage);
    }
  };

  return status === '만료' || status === '입실' ? null : (
    <button className={classes.button} onClick={handleClick}>
      입실
    </button>
  );
};

export default CheckinButton;
