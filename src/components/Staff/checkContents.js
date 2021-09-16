const checkPhone = (phone) => {
  console.log(phone);
  const phoneArray = Array.from(phone);
  console.log(phoneArray);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false);
  console.log(filteredArray);
  const filtered = filteredArray.join('');
  console.log(filtered);
  return filtered.length !== 11;
};

const checkName = (name) => {
  console.log(name);
  return name === '';
};

export const checkContents = (name, phone) => {
  if (checkName(name) === true) return false;
  if (checkPhone(phone) === true) return false;
  return true;
};
