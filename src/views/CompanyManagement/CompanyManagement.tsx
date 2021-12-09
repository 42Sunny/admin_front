import CompanyInfoContainer from 'components/Company/CompanyInfoContainer/CompanyInfoContainer';
import CompanyVisitorContainer from 'components/Company/CompanyVisitorContainer/CompanyVisitorContainer';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react';

const CompanyManagement = () => {
  return (
    <GridContainer>
      <GridItem xs={6} md={6} ms={6}>
        <CompanyInfoContainer />
      </GridItem>
      <GridItem xs={6} md={6} ms={6}>
        <CompanyVisitorContainer />
      </GridItem>
    </GridContainer>
  );
};

export default CompanyManagement;
