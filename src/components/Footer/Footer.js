/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';
import packageJson from '../../../package.json';

const useStyles = makeStyles(styles);
const DEVELOPERS = ['jayi', 'jihuhwan', 'gpark', 'jaehchoi', 'eun-park'];
const footerItems = [
  { key: '개발자 정보', value: DEVELOPERS.join(', ') },
  {
    key: '가이드',
    value: (
      <a
        href="https://docs.google.com/presentation/d/1KXoadStCBHk_2l-V6HolWA9vVP3kFhNWhSBUPQsp-l4/edit?usp=sharing"
        target="_blank"
      >
        바로가기
      </a>
    ),
  },
  { key: '버전', value: packageJson.version },
];

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div>
          {footerItems.map((item) => (
            <div key={item.key} className={classes.item}>
              <div>{item.key}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
