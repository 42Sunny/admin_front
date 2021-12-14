import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CompanyContainer from '../CompanyContainer/CompanyContainer';
import useCompanyVisitorContainerStyles from './CompanyVisitorContainerStyles';
import useCompanyVisitor from './useCompanyVisitor';

const CompanyVisitorContainer = () => {
  const { tableData, updateCompanyVisitor } = useCompanyVisitor();

  useEffect(() => {
    updateCompanyVisitor();
  }, [updateCompanyVisitor]);

  const props = {
    header: <Header />,
    tableProps: {
      tableHead: ['방문 날짜', '업체 이름', '방문자 이름', '입실 시간', '퇴실 시간'],
      tableData: tableData,
    },
  };
  return <CompanyContainer {...props} />;
};

type ChangeDateType = React.ChangeEventHandler<HTMLInputElement>;

const Header = () => {
  const classes = useCompanyVisitorContainerStyles();
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const changeStartDate: ChangeDateType = ({ target: { value } }) => {
    if (value !== '') {
      if (value >= endDate) setEndDate(value);
      setStartDate(value);
    }
  };

  const changeEndDate: ChangeDateType = ({ target: { value } }) => {
    if (value !== '') {
      if (value <= startDate) setStartDate(value);
      setEndDate(value);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>업체 방문 정보</div>
      <div className={classes.datePicker}>
        <input
          type="date"
          value={startDate}
          onChange={changeStartDate}
          className={classes.dateInput}
        />{' '}
        ~{' '}
        <input type="date" value={endDate} onChange={changeEndDate} className={classes.dateInput} />
      </div>
    </div>
  );
};

export default CompanyVisitorContainer;
