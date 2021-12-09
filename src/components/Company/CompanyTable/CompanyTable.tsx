import CustomTable from 'components/Table/Table';
import React from 'react';
import useCompanyTableStyles from './CompanyTableStyles';

type PropTypes = { tableHead: string[]; tableData: (string | JSX.Element)[][] };

const CompanyTable = ({ tableHead, tableData }: PropTypes) => {
  const classes = useCompanyTableStyles();

  return (
    <div className={classes.container}>
      <CustomTable tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
    </div>
  );
};

export default CompanyTable;
