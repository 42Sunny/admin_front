import { makeStyles } from '@material-ui/core';
import { getAllReserves } from 'api/visitorApi';
import { updateVisitorStatus } from 'api/visitorApi';
import { useContext } from 'react';
import { VisitorManagementContext } from '../../contexts/VisitorManagementContext';
import styles from './VisitorManagementStyles';

const StatusOptions = [
  { value: '대기', name: '대기' },
  { value: '입실', name: '입실' },
  { value: '만료', name: '만료' },
];

const Options = () =>
  StatusOptions.map((elem) => (
    <option value={elem.value} key={elem.value}>
      {elem.name}
    </option>
  ));

const VisitStatus = (props) => {
  const classes = makeStyles(styles)();
  const { date, setCheckInData } = useContext(VisitorManagementContext);

  const handleChange = async ({ target: { value } }) => {
    await updateVisitorStatus(props.value.visitorId, value);
    const res = await getAllReserves(date);
    setCheckInData(res.data);
  };

  return (
    <select
      name="status"
      onChange={handleChange}
      defaultValue={props.value.status}
      className={classes.statueSelect}
    >
      <Options />
    </select>
  );
};

export default VisitStatus;
