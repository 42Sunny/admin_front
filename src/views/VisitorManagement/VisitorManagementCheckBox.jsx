import { makeStyles } from '@material-ui/core';
import React from 'react';
import styles from './VisitorManagementStyles';

const VisitorManagementCheckBox = ({ setCheckGaepo, setCheckSeocho, checkGaepo, checkSeocho }) => {
  const classes = makeStyles(styles)();

  const handleCheckSeocho = () => {
    setCheckSeocho(!checkSeocho);
  };

  const handleCheckGaepo = () => {
    setCheckGaepo(!checkGaepo);
  };

  return (
    <div className={classes.checkPlaceContainer}>
      <div className={classes.checkPlaceBox} onClick={handleCheckGaepo}>
        <input
          className={classes.checkBox}
          type="checkbox"
          checked={checkGaepo}
          onChange={handleCheckGaepo}
        />
        <label className={classes.checkLabel}>개포</label>
      </div>
      <div className={classes.checkPlaceBox} onClick={handleCheckSeocho}>
        <input
          className={classes.checkBox}
          type="checkbox"
          checked={checkSeocho}
          onChange={handleCheckSeocho}
        />
        <label className={classes.checkLabel}>서초</label>
      </div>
    </div>
  );
};

export default VisitorManagementCheckBox;
