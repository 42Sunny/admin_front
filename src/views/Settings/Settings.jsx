import React from 'react';
import StaffTable from 'components/Staff/StaffTable';
import MaxHeadCount from 'components/MaxHeadCount/MaxHeadCount';
import TimeSetting from 'components/TimeSetting';

const Settings = () => {
  return (
    <>
      <TimeSetting />
      <MaxHeadCount />
      <StaffTable />
    </>
  );
};

export default Settings;
