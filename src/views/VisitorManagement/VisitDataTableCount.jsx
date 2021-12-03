import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import React, { useContext } from 'react';
import useStyles from './VisitDataTableCountStyles';

const VisitDataTableCount = () => {
  const classes = useStyles();
  const {
    allCount: { wait, all, enterance, exit },
  } = useContext(VisitorManagementContext);

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.title}>전체</div>
        <div className={classes.content}>{all}</div>
      </div>
      <div>
        <div className={classes.title}>대기</div>
        <div className={classes.content}>{wait}</div>
      </div>
      <div>
        <div className={classes.title}>입실</div>
        <div className={classes.content}>{enterance}</div>
      </div>
      <div>
        <div className={classes.title}>퇴실</div>
        <div className={classes.content}>{exit}</div>
      </div>
    </div>
  );
};

export default VisitDataTableCount;
