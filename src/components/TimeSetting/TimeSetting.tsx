import 'react-datepicker/dist/react-datepicker.css';
import { setConfig } from 'API/checkin/config';
import { forwardRef, LegacyRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
import { getConfig } from 'API/checkin/config';
import styles from './TimeSetting.module.css';
import dayjs from 'dayjs';
import { stringToDate } from 'utils/formatDate';

const TimeSetting = () => {
  const optionList = ['운영시간'];
  const target = useRef(optionList[0]);
  const startTime = useRef('00:00:00');
  const endTime = useRef('00:00:00');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    const getConfigTime = async () => {
      try {
        const { data: payload } = await getConfig();
        const open_at = payload.open_at;
        const close_at = payload.close_at;

        startTime.current = open_at;
        endTime.current = close_at;

        setStartDate(stringToDate(open_at));
        setEndDate(stringToDate(close_at));
      } catch (err) {
        console.log(err);
      }
    };
    getConfigTime();
  }, []);

  const handleSelect = (e: any) => {
    const selected = e.target.value;
    target.current = selected;
  };

  const startTimeOnChanage = (date: any) => {
    const formated = dayjs(date).format('HH:mm:ss');
    setStartDate(dayjs(date));
    startTime.current = formated;
  };

  const endTimeOnChanage = (date: any) => {
    const formated = dayjs(date).format('HH:mm:ss');
    setEndDate(dayjs(date));
    endTime.current = formated;
  };
  const handleClick = async (date: any) => {
    try {
      if (window.confirm('시간을 변경하시겠습니까')) {
        if (target.current === '운영시간')
          await setConfig({
            values: {
              open_at: startTime.current,
              close_at: endTime.current,
            },
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ExampleCustomInput = forwardRef(
    (props: any, ref: LegacyRef<HTMLButtonElement> | undefined) => {
      const { value, onClick } = props;
      return (
        <button className={styles.picker} onClick={onClick} ref={ref}>
          {value}
        </button>
      );
    },
  );

  return (
    <div>
      <h3 className={styles.timeSettingTitle}>시간변경</h3>
      <div className={styles.timeSettingWrap}>
        <select className={styles.select} onChange={handleSelect}>
          {optionList.map((option) => {
            return <option value={option}>{option}</option>;
          })}
          )
        </select>
        <div className={styles.pickerContainer}>
          <DatePicker
            selected={startDate.toDate()}
            onChange={startTimeOnChanage}
            timeIntervals={30}
            timeCaption="Time"
            showTimeSelectOnly
            showTimeSelect
            dateFormat="h:mm aa"
            className="date-picker"
            customInput={<ExampleCustomInput />}
          />
          <DatePicker
            selected={endDate.toDate()}
            onChange={endTimeOnChanage}
            timeIntervals={30}
            timeCaption="Time"
            showTimeSelectOnly
            showTimeSelect
            dateFormat="h:mm aa"
            customInput={<ExampleCustomInput />}
          />
        </div>
        <button className={styles.timeSettingButton} onClick={handleClick}>
          변경
        </button>
      </div>
    </div>
  );
};

export default TimeSetting;
