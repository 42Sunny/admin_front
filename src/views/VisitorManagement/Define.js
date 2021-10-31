import VisitorManagementPlaceSelector from './VisitorManagementPlaceSelector';

export const SEARCH_OPTIONS = [
  { value: 'name', name: '이름' },
  { value: 'staffName', name: '직원' },
  { value: 'organization', name: '소속' },
  { value: 'phone', name: '번호' },
  { value: 'status', name: '상태' },
];

export const TABLE_HEAD = [
  <VisitorManagementPlaceSelector />,
  '날짜',
  '예약 시간',
  '입실',
  '퇴실',
  '직원',
  '방문자 소속',
  '방문자 이름',
  '방문자 번호',
  '방문 목적',
  '상태',
];
