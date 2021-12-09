import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import React from 'react';
import useOrganizationContainerStyles from './OrganizationContainerStyles';

type PropTypes = {
  title?: string;
};

const CompanyContainer = ({ title }: PropTypes) => {
  const classes = useOrganizationContainerStyles();
  return (
    <Card>
      <CardHeader color="info">
        <div className={classes.title}>{title}</div>
      </CardHeader>
      <CardBody className={classes.body}></CardBody>
    </Card>
  );
};

export default CompanyContainer;
