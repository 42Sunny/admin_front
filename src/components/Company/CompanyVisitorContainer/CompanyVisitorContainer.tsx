import moment from 'moment';
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

type CompanyVisitorType = {
  checkinDate: Date | string;
  companyName: string;
  visitorName: string;
  checkinTime: Date | string;
  checkoutTime: Date | null | JSX.Element;
  visitorID: number;
};

const checkinDateReducer = ({ checkinDate, ...rest }: CompanyVisitorType) => ({
  checkinDate: moment(checkinDate).format('YYYY-MM-DD'),
  ...rest,
});

const checkinTimeReducer = ({ checkinTime, ...rest }: CompanyVisitorType) => ({
  checkinTime: moment(checkinTime).format('HH:mm'),
  ...rest,
});

const checkoutTimeReducer = ({ checkoutTime, visitorID, ...rest }: CompanyVisitorType) => ({
  checkoutTime:
    checkoutTime instanceof Date ? (
      moment(checkoutTime).format('HH:mm')
    ) : (
      <button id={visitorID?.toString()}>퇴실</button>
    ),
  ...rest,
});

const companyVisitorObjToArray = (data: CompanyVisitorType) => [
  data.checkinDate,
  data.companyName,
  data.visitorName,
  data.checkinTime,
  data.checkoutTime,
];

const reducer =
  <T,>(...fns: Function[]) =>
  (data: T) =>
    fns.reduce((data, fn) => fn(data), data);

const dummies: CompanyVisitorType[] = [
  {
    checkinDate: new Date(),
    companyName: '42 Seoul',
    visitorName: '이재하',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    visitorID: 1,
  },
  {
    checkinDate: new Date(),
    companyName: '42 Seoul',
    visitorName: 'jayi',
    checkinTime: new Date(),
    checkoutTime: null,
    visitorID: 2,
  },
  {
    checkinDate: new Date(),
    companyName: '42 Seoul',
    visitorName: 'hello',
    checkinTime: new Date(),
    checkoutTime: null,
    visitorID: 3,
  },
];

export const companyVisitorReducer = reducer<CompanyVisitorType>(
  checkinDateReducer,
  checkinTimeReducer,
  checkoutTimeReducer,
);

const CompanyVisitorContainer = () => {
  const props = {
    header: <Header />,
    tableProps: {
      tableHead: ['방문 날짜', '업체 이름', '방문자 이름', '입실 시간', '퇴실 시간'],
      tableData: dummies.map((dummy) => companyVisitorObjToArray(companyVisitorReducer(dummy))),
    },
  };
  return <CompanyContainer {...props} />;
};

export default CompanyVisitorContainer;
