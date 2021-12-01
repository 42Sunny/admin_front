import classNames from 'classnames';
import React from 'react';
import { useStyles } from './LegendStyles';

const Legend = ({ legends }) => {
  const classes = useStyles();
  return (
    <div className={classes.legendBox}>
      {legends?.map(({ color, content }, idx) => (
        <div className={classes.legendItem} key={idx}>
          <div
            className={classNames({
              [classes[color + 'LegendColor']]: color,
              [classes.legendColor]: true,
            })}
          />
          {content}
        </div>
      ))}
    </div>
  );
};

export default Legend;
