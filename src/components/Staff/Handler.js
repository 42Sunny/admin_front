import { addStaff } from 'api/visitorApi';
import { checkContents } from './checkContents';
import { confirmMessage } from './Variable';

export const handleChange = (event, setName, setPhone) => {
  const {
    target: { value, name },
  } = event;
  if (name === 'name') setName(value);
  else if (name === 'phone') setPhone(value);
};

export const handleClick = (name, phone) => {
  if (checkContents(name, phone)) {
    if (window.confirm(confirmMessage(name, phone)) === true) {
      addStaff(name, phone);
    }
  }
};