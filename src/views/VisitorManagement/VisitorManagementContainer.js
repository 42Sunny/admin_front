import React from 'react';
import { VisitorManagementProvider } from '../../contexts/VisitorManagementContext';
import VisitorManagementPresenter from './VisitDataTablePresenter';

const VisitorManagementContainer = () => {
  return (
    <VisitorManagementProvider>
      <VisitorManagementPresenter />
    </VisitorManagementProvider>
  );
};

export default VisitorManagementContainer;
