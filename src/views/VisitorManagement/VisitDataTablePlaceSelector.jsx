import useStyles from './VisitorManagementStyles';
import useVisitData from 'hooks/useVisitData';
import React from 'react';
import { PLACE_ALL, PLACE_GAEPO, PLACE_SEOCHO } from './Define';

const VisitDataTablePlaceSelector = () => {
  const classes = useStyles();
  const { place, setPlace } = useVisitData();

  const handleChange = ({ target: { value } }) => {
    setPlace(value);
  };

  return (
    <select className={classes.placeSelect} value={place} onChange={handleChange}>
      <option value={PLACE_ALL.value}>{PLACE_ALL.text}</option>
      <option value={PLACE_GAEPO.value}>{PLACE_GAEPO.text}</option>
      <option value={PLACE_SEOCHO.value}>{PLACE_SEOCHO.text}</option>
    </select>
  );
};

export default VisitDataTablePlaceSelector;
