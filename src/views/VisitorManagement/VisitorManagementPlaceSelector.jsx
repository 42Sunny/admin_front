import { makeStyles } from '@material-ui/core';
import React from 'react';
import styles from './VisitorManagementStyles';

const VisitorManagementPlaceSelector = () => {
  const classes = makeStyles(styles)();
  //   const {} =

  //   const handleCheckSeocho = () => {
  //     setCheckSeocho(!checkSeocho);
  //   };

  //   const handleCheckGaepo = () => {
  //     setCheckGaepo(!checkGaepo);
  //   };

  return (
    <select className={classes.placeSelect}>
      <option>장소</option>
      <option>개포</option>
      <option>서초</option>
    </select>
  );
};

export default VisitorManagementPlaceSelector;
