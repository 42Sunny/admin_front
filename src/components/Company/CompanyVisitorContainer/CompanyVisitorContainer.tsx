import dayjs from 'dayjs';
import React, { useState } from 'react';
import CompanyContainer from '../CompanyContainer/CompanyContainer';
import useCompanyVisitorContainerStyles from './CompanyVisitorContainerStyles';
import useCompanyVisitor from './useCompanyVisitor';

const CompanyVisitorContainer = () => {
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { tableData, pagination } = useCompanyVisitor({ startDate, endDate });

  const headerProps = {
    changeStartDate: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (value !== '') {
        if (value >= endDate) setEndDate(value);
        setStartDate(value);
      }
    },

    changeEndDate: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (value !== '') {
        if (value <= startDate) setStartDate(value);
        setEndDate(value);
      }
    },
    startDate,
    endDate,
  };

  const props = {
    header: <Header {...headerProps} />,
    tableProps: {
      tableHead: ['장소', '방문 날짜', '업체 이름', '방문자 이름', '입실 시간', '퇴실 시간'],
      tableData: tableData,
    },
    paginationProps: {
      ...pagination,
    },
  };

  return <CompanyContainer {...props} />;
};

type HeaderPropTypes = {
  startDate: string;
  endDate: string;
  changeStartDate: React.ChangeEventHandler<HTMLInputElement>;
  changeEndDate: React.ChangeEventHandler<HTMLInputElement>;
};

const Header = ({ startDate, changeStartDate, endDate, changeEndDate }: HeaderPropTypes) => {
  const classes = useCompanyVisitorContainerStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>방문 정보</div>
      <div className={classes.datePicker}>
        <input
          type="date"
          value={startDate}
          onChange={changeStartDate}
          className={classes.dateInput}
        />
        {' ~ '}
        <input type="date" value={endDate} onChange={changeEndDate} className={classes.dateInput} />
      </div>
    </div>
  );
};

export default CompanyVisitorContainer;
