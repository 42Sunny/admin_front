import { getConfig } from 'API/checkin/config';
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
      const { data: payload } = await getConfig();
      setCapacity({
        gaepo: payload.gaepo,
        seocho: payload.seocho,
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
