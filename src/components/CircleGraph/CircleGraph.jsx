import { infoColor } from 'assets/jss/material-dashboard-react';
import React, { useEffect, useState } from 'react';
import classes from './CircleGraph.module.css';

const outerCircleStyle = (percent) => ({
  background: `conic-gradient(${infoColor[1]} ${percent}%, rgba(0, 0, 0, 0.1) 0%)`,
});

const CircleGraph = ({ targetPercent, content }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const renderer = setInterval(() => {
      if (percent === targetPercent) clearInterval(renderer);
      setPercent((percent) => (percent < targetPercent ? percent + 1 : targetPercent));
    }, 10);
    return () => clearInterval(renderer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPercent]);

  return (
    <div className={classes.OuterCircle} style={outerCircleStyle(percent)}>
      <div className={classes.InnerCircle}>{content}</div>
    </div>
  );
};

export default CircleGraph;
