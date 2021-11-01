import { makeStyles } from '@material-ui/core';
import useVisitData from 'hooks/useVisitData';
import React from 'react';
import { PLACE_ALL, PLACE_GAEPO, PLACE_SEOCHO } from './Define';
import styles from './VisitorManagementStyles';

const VisitDataTablePlaceSelector = () => {
  const classes = makeStyles(styles)();
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
