import { addStaff } from 'admin/api/apiHandler';
import { checkContents } from './checkContents';
import { confirmMessage } from './StaffContent';

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
