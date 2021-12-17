import React from 'react';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import RegularButton from 'components/CustomButtons/Button.js';
import { setConfig } from 'API/checkinApi.js';
import { useStyles } from './maxHeadCountInputStyle';

const CONFIRM_MESSAGE = '최대 입장 인원 값을 변경하시겠습니까?';
const SUBTITLE_MESSAGE = '입장 가능한 최대 카뎃 인원을 입력해주세요.';

const MaxHeadCountInput = ({ capacity, setCapacity, getHeadCount, cluster }) => {
  const classes = useStyles();
  const clusterId = cluster === '개포' ? 'gaepo' : 'seocho';
  const handleChange = (e) => {
    setCapacity({
      ...capacity,
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    try {
      if (window.confirm(CONFIRM_MESSAGE)) {
        await setConfig({
          values: {
            gaepo: Number.parseInt(capacity.gaepo),
            seocho: Number.parseInt(capacity.seocho),
          },
        });
      } else {
        await getHeadCount();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GridItem xs={12} sm={6} md={6}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>{cluster}</h4>
          <p className={classes.cardCategoryWhite}>{SUBTITLE_MESSAGE}</p>
        </CardHeader>
        <CardBody className={classes.cardBody} color="info">
          <input
            className={classes.input}
            id={clusterId}
            value={capacity[clusterId]}
            type="number"
            onChange={handleChange}
          />
          <RegularButton onClick={handleClick} color="info">
            변경
          </RegularButton>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default MaxHeadCountInput;
