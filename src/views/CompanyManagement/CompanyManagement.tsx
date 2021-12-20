import React from 'react';
import CompanyInfoContainer from 'components/Company/CompanyInfoContainer/CompanyInfoContainer';
import CompanyVisitorContainer from 'components/Company/CompanyVisitorContainer/CompanyVisitorContainer';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Route, Switch } from 'react-router';
import CompanyEnteranceModal from 'components/Company/CompanyEnteranceModal/CompanyEnteranceModal';

const CompanyManagement = () => {
  return (
    <>
      <GridContainer>
        <GridItem xs={6} md={6} ms={6}>
          <CompanyInfoContainer />
        </GridItem>
        <GridItem xs={6} md={6} ms={6}>
          <CompanyVisitorContainer />
        </GridItem>
      </GridContainer>
      <Switch>
        <Route path="/company/management/enterance/:id" component={CompanyEnteranceModal} />
      </Switch>
    </>
  );
};

export default CompanyManagement;
