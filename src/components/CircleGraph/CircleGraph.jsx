import { infoColor } from 'assets/jss/material-dashboard-react';
import React, { useEffect, useState } from 'react';
import classes from './CircleGraph.module.css';

const outerCircleStyle = (percent) => ({
  background: `conic-gradient(${infoColor[1]} ${percent}%, rgba(0, 0, 0, 0.1) 0%)`,
});

const CircleGraph = ({ targetPercent, content }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let currentPercnet = 0;
    const renderer = setInterval(() => {
      if (currentPercnet === targetPercent) clearInterval(renderer);
      currentPercnet = currentPercnet < targetPercent ? currentPercnet + 1 : targetPercent;
      setPercent(currentPercnet);
    }, 10);
    return () => clearInterval(renderer);
  }, [targetPercent]);

  return (
    <div className={classes.OuterCircle} style={outerCircleStyle(percent)}>
      <div className={classes.InnerCircle}>{content}</div>
    </div>
  );
};

export default CircleGraph;
