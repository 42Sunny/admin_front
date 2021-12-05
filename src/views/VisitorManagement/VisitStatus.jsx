import { getVisitorLogs } from 'api/visitorApi';
import { updateVisitorStatus } from 'api/visitorApi';
import { useContext, useState, useEffect } from 'react';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import useStyles from './VisitorManagementStyles';

const StatusOptions = [
  { value: '대기', name: '대기' },
  { value: '입실', name: '입실' },
  { value: '퇴실', name: '퇴실' },
  { value: '만료', name: '만료' },
];

const Options = () =>
  StatusOptions.map((elem) => (
    <option value={elem.value} key={elem.value}>
      {elem.name}
    </option>
  ));

const VisitStatus = ({ defaultStatus, visitorId }) => {
  const classes = useStyles();
  const [status, setStatus] = useState(defaultStatus);
  const { startDate, endDate, setVisitData, page, setLastPage } =
    useContext(VisitorManagementContext);

  const handleChange = async ({ target: { value } }) => {
    await updateVisitorStatus(visitorId, value);
    const res = await getVisitorLogs({ start: startDate, end: endDate, page });
    setVisitData(res.data.checkInLogs);
    setLastPage(res.data.lastPage);
    setStatus(value);
  };

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  return (
    <select name="status" onChange={handleChange} value={status} className={classes.statueSelect}>
      <Options />
    </select>
  );
};

export default VisitStatus;
