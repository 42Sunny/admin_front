import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Pagination from 'components/Pagination';
import React from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import useCompanyContainerStyles from './CompanyContainerStyles';

export type CompanyTableDataType = string | JSX.Element | null;
type PropTypes = {
  header: string | JSX.Element;
  tableProps: {
    tableHead: string[];
    tableData: CompanyTableDataType[][];
  };
  paginationProps: {
    paginationLength: number;
    start: number;
    end: number;
    increase?: React.MouseEventHandler<HTMLButtonElement>;
    decrease?: React.MouseEventHandler<HTMLButtonElement>;
    clickDescription?: React.MouseEventHandler<HTMLButtonElement>;
  };
};

const CompanyContainer = ({ header, tableProps, paginationProps }: PropTypes) => {
  const classes = useCompanyContainerStyles();
  return (
    <Card className={classes.container}>
      <CardHeader color="info">
        <div className={classes.header}>{header}</div>
      </CardHeader>
      <CardBody className={classes.body}>
        <div className={classes.bodyHeader}>
          <Pagination {...paginationProps} />
        </div>
        <CompanyTable {...tableProps} />
      </CardBody>
    </Card>
  );
};

export default CompanyContainer;
