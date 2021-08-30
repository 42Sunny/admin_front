import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
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

import { getCluster, getStudent, getCard, getCheckIn, getAllCard } from '../api/api';
import { gaepoCard, seochoCard } from '../utils/cardList';

import '../assets/styles/SearchBar.css';

const SearchBar = forwardRef(
  (
    {
      type,
      setLogs,
      page,
      setPage,
      clusterType,
      setClusterType,
      login,
      setLogin,
      cardId,
      setCardId,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      onSubmit,
    }));

    const useStyles = makeStyles(() => ({
      margin: {
        display: 'flex',
        width: '100%',
        height: '10vh',
        minHeight: '60px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }));
    const classes = useStyles();

    const onSubmit = async (e) => {
      try {
        let response;
        switch (type) {
          case 0:
            response = await getCluster(clusterType, page - 1);
            break;
          case 1:
            if (login) response = await getStudent(login, page - 1);
            else throw '인트라 ID가 비어있습니다.\n유효한 인트라 ID를 입력하세요.';
            break;
          case 2:
            if (cardId !== 0) response = await getCard(cardId, page - 1);
            else throw '카드 번호가 초기값 0입니다.\n유효한 카드 번호를 입력하세요.';
            break;
          case 3:
            response = await getCheckIn(clusterType);
            break;
          case 4:
            response = await getAllCard(clusterType);
            break;
          default:
            break;
        }
        let datas;
        datas = response.data;
        if (type === 3 || type === 4) {
          datas = response.data
            .filter(
              (item, index) =>
                response.data.findIndex((item2) => item.user._id === item2.user._id) === index,
            )
            .reverse();
          if (type === 4) {
            let newdata = [];
            const card = clusterType === '0' ? gaepoCard : seochoCard;
            card.map((item) => {
              return newdata.push({ id: item, ...datas.find((ele) => ele.card.cardId === item) });
            });
            datas = newdata;
          }
        }
        setLogs(datas);
      } catch (err) {
        console.log(err);
      }
    };

    const handleChange = (event) => {
      setLogs([]);
      setClusterType(event.target.value);
      setPage(1);
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Enter') {
        onSubmit();
      }
    };

    useEffect(() => {
      onSubmit();
    }, [type, page, clusterType, login, cardId]);

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
              label="인트라 ID"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
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
              label="카드 번호"
              type="number"
              value={cardId}
              onChange={(e) => {
                setCardId(e.target.value);
              }}
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
    switch (type) {
      case 0:
        return Cluster();
      case 1:
        return Student();
      case 2:
        return Card();
      case 3:
        return Cluster();
      default:
        return Cluster();
    }
  },
);

export default SearchBar;
