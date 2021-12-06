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
  const { reloadData } = useContext(VisitorManagementContext);

  const handleChange = async ({ target: { value } }) => {
    await updateVisitorStatus(visitorId, value);
    reloadData();
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
