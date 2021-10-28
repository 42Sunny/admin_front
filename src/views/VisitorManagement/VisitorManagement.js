import React from 'react';
import { VisitorManagementProvider } from './VisitorManagementContext';
import VisitorManagementPresenter from './VisitorManagementPresenter';

const VisitorManagement = () => {
  return (
    <VisitorManagementProvider>
      <VisitorManagementPresenter />
    </VisitorManagementProvider>
  );
};

export default VisitorManagement;
