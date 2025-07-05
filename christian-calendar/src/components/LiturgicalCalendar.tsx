import React, { useState, useEffect } from 'react';
import Year from './Year';
import { Year as CalendarYear, yearFor } from '../libs/christian-calendar';
import '../App.css';

interface LiturgicalCalendarProps {
  /**
   * Year of the church calendar to display. If omitted the component
   * will calculate the current church year on mount.
   */
  year?: number;
  /**
   * Callback invoked whenever the displayed year changes due to user
   * interaction.
   */
  onYearChange?: (year: number) => void;
}

const LiturgicalCalendar: React.FC<LiturgicalCalendarProps> = ({ year, onYearChange }) => {
  const [currentYear, setCurrentYear] = useState<CalendarYear>(
    new CalendarYear(year ?? yearFor(new Date()))
  );

  useEffect(() => {
    if (year !== undefined && year !== currentYear.year) {
      setCurrentYear(new CalendarYear(year));
    }
  }, [year, currentYear.year]);

  const changeYear = (increment: number) => {
    const newYearNumber = currentYear.year + increment;
    if (year === undefined) {
      setCurrentYear(new CalendarYear(newYearNumber));
    }
    if (onYearChange) {
      onYearChange(newYearNumber);
    }
  };

  return (
    <div className={"year-demo-container"}>
      <div className={"year-nav-button-container"}>
        <button onClick={() => changeYear(-1)}>Previous Year</button>
        <button onClick={() => changeYear(1)}>Next Year</button>
      </div>
      <Year year={currentYear} />
    </div>
  );
};

export default LiturgicalCalendar;
