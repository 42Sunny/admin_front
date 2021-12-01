import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React from 'react';
import CircleGraph from 'components/CircleGraph/CircleGraph';
import { useStyles } from './HeadCountStyles';
import Legend from 'components/Legend/Legend';

const VisitorHeadCount = ({ xs, sm, md, targetPercent, content, title, color, legends }) => {
  const classes = useStyles();

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.graphTitle}>{title}</h4>
        </CardHeader>
        <div>
          <Legend legends={legends} />
          <div className={classes.graphBody}>
            <CircleGraph targetPercent={targetPercent} content={content} />
          </div>
        </div>
      </Card>
    </GridItem>
  );
};

export default VisitorHeadCount;
