import { type FC, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { add, format } from 'date-fns';
import {
  STORE_ENDING_TIME,
  STORE_OPENNING_TIME,
  TIME_INTERVAL,
} from '~/constants/config';

interface indexProps {}

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calendar: FC<indexProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getDate = () => {
    const { justDate } = date;

    if (!justDate) return;

    const beginning = add(justDate, { hours: STORE_OPENNING_TIME });
    const ending = add(justDate, { hours: STORE_ENDING_TIME });

    const times = [];
    for (
      let i = beginning;
      i <= ending;
      i = add(i, { minutes: TIME_INTERVAL })
    ) {
      times.push(i);
    }

    return times;
  };

  const times = getDate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, 'kk:mm')}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
