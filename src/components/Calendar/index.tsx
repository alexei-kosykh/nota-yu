import { type FC, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { add } from 'date-fns';

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

 

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.justDate ? (
        <div className="flex gap-4">
          <div className="flex flex-col gap-2"></div>
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
