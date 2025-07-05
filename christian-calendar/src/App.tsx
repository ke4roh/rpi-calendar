import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LiturgicalCalendar from './components/LiturgicalCalendar';
import { yearFor } from './libs/christian-calendar';

function App() {
  const [year, setYear] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const yearParam = params.get('year');

    let effectiveYear: number;
    if (yearParam && !isNaN(Number(yearParam))) {
      effectiveYear = Math.max(parseInt(yearParam, 10), 1876);
    } else {
      let date = new Date();
      effectiveYear = yearFor(date);
    }


    setYear(effectiveYear);
  }, [location.search]);

  const handleYearChange = (newYear: number) => {
    navigate(`?year=${newYear}`);
  };

  return (
    <LiturgicalCalendar year={year ?? undefined} onYearChange={handleYearChange} />
  );
}

export default App;
