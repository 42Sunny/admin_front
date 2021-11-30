/*
로그 정보를 받아 클러스터 이름을 반환해주는 함수
*/
export const getClusterName = (value) => {
  if (!value) return value;
  if (typeof value === 'string') {
    if (value === '0') return '개포';
    else if (value === '1') return '서초';
    else return 'invalid value';
  } else {
    const { card_no } = value;
    if (card_no >= 1000) return '서초';
    else return '개포';
  }
};

/*
로그 정보를 받아 클러스터 번호를 반환해주는 함수
*/
export const getClusterNumber = (value) => {
  if (!value) return value;
  if (typeof value === 'string') {
    if (value === '개포') return '0';
    else if (value === '서초') return '1';
    else return 'invalid value';
  } else {
    const { card_no } = value;
    if (card_no >= 1000) return '1';
    else return '0';
  }
};
