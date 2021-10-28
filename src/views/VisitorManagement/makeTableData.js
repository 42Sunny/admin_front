import { useFormattedPhone } from 'hooks/useFormattedPhone';
import moment from 'moment';
import VisitorManagementStatus from './VisitorManagementStatus';

const makeTableData = (checkInData, searchOption, searchValue, checks) => {
  let results = [];
  const [checkGaepo, checkSeocho] = checks;
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    if ((place === '서초' && checkSeocho) || (place === '개포' && checkGaepo)) {
      visitors.forEach((visitor) => {
        const enterDate = date && new moment(date).format('YYYY-MM-DD');
        const reserveTime = date && new moment(date).format('HH:mm');
        const enterTime = visitor.checkInTime && new moment(visitor.checkInTime).format('HH:mm');
        const exitTime = visitor.checkOutTime && new moment(visitor.checkOutTime).format('HH:mm');
        const temp = [
          place,
          enterDate,
          reserveTime,
          enterTime,
          exitTime,
          staffName,
          visitor.organization,
          visitor.name,
          useFormattedPhone(visitor.phone),
          purpose,
          <VisitorManagementStatus value={visitor} />,
        ];
        if (searchValue === '') results.push(temp);
        else {
          if (searchOption === 'name' && visitor.name.search(searchValue) !== -1)
            results.push(temp);
          else if (searchOption === 'staffName' && staffName.search(searchValue) !== -1)
            results.push(temp);
          else if (
            searchOption === 'organization' &&
            visitor.organization.search(searchValue) !== -1
          )
            results.push(temp);
          else if (searchOption === 'phone' && visitor.phone.search(searchValue) !== -1)
            results.push(temp);
          else if (searchOption === 'status' && visitor.status.search(searchValue) !== -1)
            results.push(temp);
        }
      });
    }
  });
  results.reverse();
  return results;
};

export default makeTableData;
