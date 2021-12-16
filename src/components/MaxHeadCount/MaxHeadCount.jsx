import { getConfig } from 'API/checkinApi';
import GridContainer from 'components/Grid/GridContainer';
import React, { useEffect, useState } from 'react';
import MaxHeadCountInput from './MaxHeadCountInput';

const MaxHeadCount = () => {
  const [capacity, setCapacity] = useState({
    gaepo: '',
    seocho: '',
  });

  const getHeadCount = async () => {
    try {
      const response = await getConfig();
      setCapacity({
        gaepo: response.data.gaepo,
        seocho: response.data.seocho,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHeadCount();
  }, []);

  const maxHeadCountInputProps = {
    capacity,
    setCapacity,
    getHeadCount,
  };

  return (
    <GridContainer>
      <MaxHeadCountInput {...maxHeadCountInputProps} cluster="개포" />
      <MaxHeadCountInput {...maxHeadCountInputProps} cluster="서초" />
    </GridContainer>
  );
};

export default MaxHeadCount;
