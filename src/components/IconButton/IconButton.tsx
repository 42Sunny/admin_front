import React from 'react';
import { Icon } from '@mui/material';
import classNames from 'classnames';
import useIconButtonStyles from './IconButtonStyles';

type IconButtonPropTypes = {
  icon: string;
  className?: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const IconButton = ({ icon, className, ...rest }: IconButtonPropTypes) => {
  const classes = useIconButtonStyles();

  return (
    <button
      className={classNames({ [className ?? '']: className, [classes.button]: true })}
      {...rest}
    >
      <Icon>{icon}</Icon>
    </button>
  );
};

export default IconButton;
