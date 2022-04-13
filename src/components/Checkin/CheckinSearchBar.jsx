import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { debounce } from 'lodash';

import useCriteria from 'store/modules/criteria/useCriteriaStore';
import useCheckInLogs from 'store/modules/checkinLogs/useCheckInLogsStore';
import useStyles from './CheckinSearchBarStyles';
import { getCard, getCheckIn, getCluster, getStudent } from 'API/checkin/log';

const CheckinSearchBar = () => {
  const classes = useStyles();

  const {
    criteria: { clusterNumber, currentPage, logType, cardNum, intraId, listSize },
    setClusterNumber,
    setLastPage,
    setCardNum,
    setIntraId,
    setCurrentPage,
  } = useCriteria();

  const { setCheckInLogs } = useCheckInLogs();

  const onSubmit = async () => {
    try {
      let response;

      switch (logType) {
        case 0:
          response = await getCluster(clusterNumber, currentPage, listSize);
          break;
        case 1:
          if (intraId) response = await getStudent(intraId, currentPage, listSize);
          else throw new Error('유효한 인트라 ID를 입력하세요.');
          break;
        case 2:
          if (cardNum !== 0 && cardNum !== '')
            response = await getCard(cardNum, currentPage, listSize);
          else throw new Error('유효한 카드 번호를 입력하세요.');
          break;
        case 3:
          response = await getCheckIn(clusterNumber, currentPage);
          break;
        default:
          break;
      }

      if (response.data.payload.list) {
        let datas;
        datas = response.data.payload.list;
        setCheckInLogs(datas);
        setLastPage(response.data.payload.lastPage);
        if (response.data.payload.lastPage < currentPage) {
          setCurrentPage(1);
        }
      } else {
        setCheckInLogs([]);
        setLastPage(1);
        throw new Error('response 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setCheckInLogs([]);
    setClusterNumber(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      onSubmit();
    }
  };

  const handleChangeWithDebounce = debounce((e) => {
    if (e.target.id === 'intra-id') setIntraId(e.target.value);
    else if (e.target.id === 'card-number') setCardNum(e.target.value);
  }, 200);

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logType, currentPage, clusterNumber, intraId, cardNum, listSize]);

  const studentProps = {
    classes,
    onSubmit,
    handleChangeWithDebounce,
    handleKeyDown,
  };

  const cardProps = {
    classes,
    onSubmit,
    handleChangeWithDebounce,
    handleKeyDown,
  };

  const clusterProps = {
    classes,
    clusterNumber,
    handleChange,
  };

  switch (logType) {
    case 1:
      return <Student {...studentProps} />;
    case 2:
      return <Card {...cardProps} />;
    default:
      return <Cluster {...clusterProps} />;
  }
};

const Student = ({ classes, onSubmit, handleChangeWithDebounce, handleKeyDown }) => (
  <div className={classes.margin}>
    <Grid container spacing={1} justifyContent="center" alignItems="flex-end">
      <Grid item>
        <TextField
          id="intra-id"
          label="인트라 ID"
          onChange={handleChangeWithDebounce}
          onKeyDown={handleKeyDown}
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={onSubmit}>
          조회
        </Button>
      </Grid>
    </Grid>
  </div>
);

const Card = ({ classes, onSubmit, handleChangeWithDebounce, handleKeyDown }) => (
  <div className={classes.margin}>
    <Grid container spacing={1} justifyContent="center" alignItems="flex-end">
      <Grid item>
        <TextField
          id="card-number"
          label="카드 번호"
          type="number"
          onChange={handleChangeWithDebounce}
          onKeyDown={handleKeyDown}
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={onSubmit}>
          조회
        </Button>
      </Grid>
    </Grid>
  </div>
);

const Cluster = ({ classes, clusterNumber, handleChange }) => (
  <div className={classes.margin}>
    <FormControl component="fieldset">
      <RadioGroup name="cluster" value={clusterNumber} onChange={handleChange} row>
        <FormControlLabel value="0" control={<Radio color="default" size="small" />} label="개포" />
        <FormControlLabel value="1" control={<Radio color="default" size="small" />} label="서초" />
      </RadioGroup>
    </FormControl>
  </div>
);

export default CheckinSearchBar;
