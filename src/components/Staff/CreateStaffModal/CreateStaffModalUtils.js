import { checkStaff } from 'api/visitorApi';

export const DUPLICATE_NAME_ERROR_MESSAGE = '이미 사용중인 이름입니다.';
export const INVALIDE_PHONE_ERROR_MESSAGE = '번호 형식이 올바르지 않습니다.';
export const INVALIDE_NAME_ERROR_MESSAGE = '공백으로 지정할 수 없습니다.';
export const INPUT_DEPARTMENT_NAME = 'department';
export const INPUT_NAME_NAME = 'name';
export const INPUT_PHONE_NAME = 'phone';
export const PHONE_REG_EXP = /^01\d{8,9}$/; // 휴대폰 번호 유효성 검사 정규표현식
export const CREATE_STAFF_MODAL_TITLE = '직원 등록';
export const CREATE_STAFF_MODAL_SUBTITLE = '등록하고자하는 직원 정보를 입력해주세요.';
export const CREATE_STAFF_MODAL_ADD_BUTTON_TEXT = '등록';

export const CREATE_CONFIRM_MESSAGE = (department, name, phone) =>
  `소속 : ${department}\n이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 등록하시겠습니까?`;

export const getOnlyNumber = (num) => {
  const phoneArray = Array.from(num);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false && elem !== ' ');
  const filtered = filteredArray.join('');
  return filtered;
};

export const checkPhone = (phone) => {
  const phoneArray = Array.from(phone);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false && elem !== ' ');
  const filtered = filteredArray.join('');
  if (PHONE_REG_EXP.exec(filtered) !== null) return true;
  return INVALIDE_PHONE_ERROR_MESSAGE;
};

export const checkName = async (name) => {
  if (name === '') return INVALIDE_NAME_ERROR_MESSAGE;
  const { data } = await checkStaff(name);
  if (data.code === '2000') return DUPLICATE_NAME_ERROR_MESSAGE;
  return true;
};

export const checkContents = async (name, phone) => {
  const checkNameResult = await checkName(name);
  const checkPhoneResult = checkPhone(phone);
  if (checkNameResult !== true) return checkNameResult;
  if (checkPhoneResult !== true) return checkPhoneResult;
  return true;
};
