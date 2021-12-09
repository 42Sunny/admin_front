import React from 'react';
import CompanyContainer from '../CompanyContainer/CompanyContainer';
import useCompanyVisitorContainerStyles from './CompanyVisitorContainerStyles';

const Header = () => {
  const classes = useCompanyVisitorContainerStyles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>업체 방문 정보</div>
      <div className={classes.datePicker}>2021. 12. 09 ~ 2021. 12. 09</div>
    </div>
  );
};

const CompanyVisitorContainer = () => {
  const props = {
    header: <Header />,
    tableProps: {
      tableHead: ['업체 이름', '입실 시간', '퇴실 시간'],
      tableData: [
        ['42 Seoul', '9:11', '13:11'],
        ['42 Seoul', '11:11', '19:20'],
        ['42 Seoul', '13:11', <button>퇴실</button>],
        ['42 Seoul', '14:22', ''],
        ['42 Seoul', '15:15', '13:15'],
      ],
    },
  };
  return <CompanyContainer {...props} />;
};

export default CompanyVisitorContainer;
