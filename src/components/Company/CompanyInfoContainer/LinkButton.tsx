import IconButton from 'components/IconButton/IconButton';
import React from 'react';
import { Link } from 'react-router-dom';

type PropTypes = {
  id: string;
  icon: string;
  path: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const LinkButton = ({ id, icon, handleClick, path }: PropTypes) => {
  return (
    <Link to={path}>
      <IconButton icon={icon} id={id} onClick={handleClick} />
    </Link>
  );
};

export default LinkButton;
