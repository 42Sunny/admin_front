import OrganizationContainer from 'components/Organization/OrganizationContainer/OrganizationContainer';
import React from 'react';

const OrganizationManagement = () => {
  return (
    <div>
      <OrganizationContainer title="업체 정보" />
      <OrganizationContainer title="업체 출입" />
    </div>
  );
};

export default OrganizationManagement;
