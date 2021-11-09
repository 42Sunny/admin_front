import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Looks4Icon from '@material-ui/icons/Looks4';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import { debounce } from 'lodash';

import { getCluster, getStudent, getCard, getCheckIn } from '../api/checkinApi';
import useCriteria from '../hooks/useCriteria';
import useCheckinLog from '../hooks/useCheckinLog';
import '../assets/css/CheckinSearchBar.css';

const useStyles = makeStyles(() => ({
  margin: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const CheckinSearchBar = ({ isLightType }) => {
  const classes = useStyles();

  const {
    criteria: { clusterType, currentPage, logType, cardNum, intraId, listSize },
    setClusterType,
    setLastPage,
    setCardNum,
    setIntraId,
    setCurrentPage,
  } = useCriteria();

  const { setLogs } = useCheckinLog();

  const onSubmit = async (e) => {
    try {
      let response;
      switch (logType) {
        case 0:
          response = await getCluster(clusterType, currentPage, listSize);
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
          if (isLightType) {
            response = await getCheckIn(clusterType, currentPage, 10);
          } else {
            response = await getCheckIn(clusterType, currentPage);
          }
          break;
        default:
          break;
      }
      if (response.data.list) {
        let datas;
        datas = response.data.list;
        setLogs(datas);
        setLastPage(response.data.lastPage);
        if (response.data.lastPage < currentPage) {
          setCurrentPage(1);
        }
      } else {
        setLogs([]);
        setLastPage(1);
        throw new Error('response 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setLogs([]);
    setClusterType(event.target.value);
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
  }, [logType, currentPage, clusterType, intraId, cardNum, listSize]);

  const Cluster = () => (
    <div className={classes.margin}>
      <FormControl component="fieldset">
        <RadioGroup name="cluster" value={clusterType} onChange={handleChange} row>
          <FormControlLabel
            value="0"
            control={<Radio color="default" size="small" />}
            label="개포"
          />
          <FormControlLabel
            value="1"
            control={<Radio color="default" size="small" />}
            label="서초"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );

  const Student = () => (
    <div className={classes.margin}>
      <Grid container spacing={1} justifyContent="center" alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
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

  const Card = () => (
    <div className={classes.margin}>
      <Grid container spacing={1} justifyContent="center" alignItems="flex-end">
        <Grid item>
          <Looks4Icon />
          <LooksTwoIcon />
        </Grid>
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
  switch (logType) {
    case 1:
      return Student();
    case 2:
      return Card();
    default:
      return Cluster();
  }
};

export default CheckinSearchBar;
