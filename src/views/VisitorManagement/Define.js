import React from 'react';
import VisitorManagementPlaceSelector from './VisitDataTablePlaceSelector';

export const SEARCH_OPTION_NAME = { value: 'name', text: '이름' };
export const SEARCH_OPTION_STAFF_NAME = { value: 'staffName', text: '직원' };
export const SEARCH_OPTION_ORGANIZATION = { value: 'organization', text: '소속' };
export const SEARCH_OPTION_PHONE = { value: 'phone', text: '번호' };
export const SEARCH_OPTION_STATUS = { value: 'status', text: '상태' };

export const SEARCH_OPTIONS = [
  SEARCH_OPTION_NAME,
  SEARCH_OPTION_STAFF_NAME,
  SEARCH_OPTION_ORGANIZATION,
  SEARCH_OPTION_PHONE,
  SEARCH_OPTION_STATUS,
];

export const VISITOR_TABLE_HEAD = [
  <VisitorManagementPlaceSelector />,
  '날짜',
  '방문자 소속',
  '방문자 이름',
  '방문자 번호',
  '방문 목적',
  '직원 이름',
  '직원 번호',
  '예약 시간',
  '입실 시간',
  '퇴실 시간',
  '상태',
];

export const PLACE_ALL = { value: 'all', text: '장소' };
export const PLACE_GAEPO = { value: '개포', text: '개포' };
export const PLACE_SEOCHO = { value: '서초', text: '서초' };
