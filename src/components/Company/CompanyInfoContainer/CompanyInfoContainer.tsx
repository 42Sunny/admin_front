import { Icon } from '@mui/material';
import React from 'react';
import CompanyContainer from '../CompanyContainer/CompanyContainer';
import useCompanyInfoContainerStyles from './CompanyInfoContainerStyles';

const Header = () => {
  const classes = useCompanyInfoContainerStyles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>등록 업체</div>
      <div className={classes.addCompany}>
        업체 등록
        <Icon className={classes.addIcon}>add_circle</Icon>
      </div>
    </div>
  );
};

const CompanyInfoContainer = () => {
  const props = {
    header: <Header />,
    tableProps: {
      tableHead: ['업체 이름', '대표 번호', '입실', '삭제'],
      tableData: [
        ['42 Seoul', '010-0000-0000', <Icon>login</Icon>, <Icon>delete</Icon>],
        ['웅진 코웨이', '010-1234-5678', <Icon>login</Icon>, <Icon>delete</Icon>],
        ['Innovation Academy', '010-2222-2222', <Icon>login</Icon>, <Icon>delete</Icon>],
      ],
    },
  };
  return <CompanyContainer {...props} />;
};

export default CompanyInfoContainer;
