const checkPhone = (phone) => {
  const phoneArray = Array.from(phone);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false);
  const filtered = filteredArray.join('');
  return filtered.length !== 11;
};

const checkName = (name) => {
  return name === '';
};

export const checkContents = (name, phone) => {
  if (checkName(name) === true) return false;
  if (checkPhone(phone) === true) return false;
  return true;
};
