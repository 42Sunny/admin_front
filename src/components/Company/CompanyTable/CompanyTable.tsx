import CustomTable from 'components/Table/Table';
import React from 'react';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import useCompanyTableStyles from './CompanyTableStyles';

type PropTypes = { tableHead: string[]; tableData: CompanyTableDataType[][] };

const CompanyTable = ({ tableHead, tableData }: PropTypes) => {
  const classes = useCompanyTableStyles();

  return (
    <div className={classes.container}>
      <CustomTable tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
    </div>
  );
};

export default CompanyTable;
