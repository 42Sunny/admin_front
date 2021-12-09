import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import React from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import useCompanyContainerStyles from './CompanyContainerStyles';

type PropTypes = {
  header: string | JSX.Element;
  tableProps: {
    tableHead: string[];
    tableData: (string | JSX.Element | null | Date)[][];
  };
};

const CompanyContainer = ({ header, tableProps }: PropTypes) => {
  const classes = useCompanyContainerStyles();
  return (
    <Card className={classes.container}>
      <CardHeader color="info">
        <div className={classes.header}>{header}</div>
      </CardHeader>
      <CardBody className={classes.body}>
        <CompanyTable {...tableProps} />
      </CardBody>
    </Card>
  );
};

export default CompanyContainer;
