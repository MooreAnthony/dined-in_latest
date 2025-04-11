import { useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

type ViewMode = 'calendar' | 'month' | 'year';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

const calendarDays: Array<dayjs.Dayjs> = [];
  let day = startDate;
  while (day.isBefore(endDate, 'day')) {
    for (let i = 0; i < 7; i++) {
      calendarDays.push(day);
      day = day.add(1, 'day');
    }
  }

  const handleSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(prev => (prev && prev.isSame(date, 'day') ? null : date));
  };

  const goToPrev = () => {
    if (viewMode === 'calendar') setCurrentMonth(currentMonth.subtract(1, 'month'));
    if (viewMode === 'month') setCurrentMonth(currentMonth.subtract(1, 'year'));
    if (viewMode === 'year') setCurrentMonth(currentMonth.subtract(12, 'year'));
  };

  const goToNext = () => {
    if (viewMode === 'calendar') setCurrentMonth(currentMonth.add(1, 'month'));
    if (viewMode === 'month') setCurrentMonth(currentMonth.add(1, 'year'));
    if (viewMode === 'year') setCurrentMonth(currentMonth.add(12, 'year'));
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentMonth(currentMonth.month(monthIndex));
    setViewMode('calendar');
  };

  const selectYear = (year: number) => {
    setCurrentMonth(currentMonth.year(year));
    setViewMode('month');
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={goToPrev} className="text-dark-text-muted hover:text-white">&lt;</button>
      <div className="flex flex-col text-center">
        <button
          onClick={() => setViewMode('month')}
          className="font-semibold text-lg text-white hover:underline"
        >
          {currentMonth.format('MMMM')}
        </button>
        <button
          onClick={() => setViewMode('year')}
          className="text-sm text-dark-text-secondary hover:underline"
        >
          {currentMonth.format('YYYY')}
        </button>
      </div>
      <button onClick={goToNext} className="text-dark-text-muted hover:text-white">&gt;</button>
    </div>
  );

  const renderMonthPicker = () => (
    <div className="grid grid-cols-3 gap-2">
      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
        <button
          key={month}
          onClick={() => selectMonth(i)}
          className={clsx(
            'py-2 rounded-lg text-sm',
            {
              'bg-dark-accent text-white': currentMonth.month() === i,
              'hover:bg-dark-primary': currentMonth.month() !== i,
            }
          )}
        >
          {month}
        </button>
      ))}
    </div>
  );

  const renderYearPicker = () => {
    const currentYear = currentMonth.year();
    const startYear = currentYear - (currentYear % 12);
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <div className="grid grid-cols-3 gap-2">
        {years.map(year => (
          <button
            key={year}
            onClick={() => selectYear(year)}
            className={clsx(
              'py-2 rounded-lg text-sm',
              {
                'bg-dark-accent text-white': currentMonth.year() === year,
                'hover:bg-dark-primary': currentMonth.year() !== year,
              }
            )}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  const renderCalendarGrid = () => (
    <>
      <div className="grid grid-cols-7 text-sm text-dark-text-secondary mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarDays.map(d => {
          const isToday = d.isSame(dayjs(), 'day');
          const isSelected = selectedDate?.isSame(d, 'day');
          const isCurrentMonth = d.isSame(currentMonth, 'month');

          return (
            <button
              key={d.toString()}
              onClick={() => handleSelect(d)}
              className={clsx(
                'py-2 rounded-lg transition-colors',
                {
                  'bg-dark-accent text-white': isSelected,
                  'bg-dark-primary text-white': isToday && !isSelected,
                  'text-dark-text-muted': !isCurrentMonth,
                  'hover:bg-dark-accent/60': isCurrentMonth && !isSelected,
                }
              )}
            >
              {d.date()}
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="p-4 bg-dark-secondary rounded-2xl shadow-dark-md text-dark-text-primary w-full max-w-md">
      {renderHeader()}

      {viewMode === 'calendar' && renderCalendarGrid()}
      {viewMode === 'month' && renderMonthPicker()}
      {viewMode === 'year' && renderYearPicker()}

      {selectedDate && (
        <p className="mt-4 text-sm text-dark-text-secondary">
          Selected:{' '}
          <span className="font-medium text-white">
            {selectedDate.format('dddd, MMMM D, YYYY')}
          </span>
        </p>
      )}
    </div>
  );
};

export default Calendar;
