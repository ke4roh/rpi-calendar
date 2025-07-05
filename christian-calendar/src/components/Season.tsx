import React from 'react';
import Color from './Color';
import type { Season as CalendarSeason } from '../libs/christian-calendar';

interface SeasonProps {
  season: CalendarSeason;
}
const Season: React.FC<SeasonProps> = ({ season }) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startDate = season.startDate.toLocaleDateString(navigator.language, options)
  const endDate = season.endDate.toLocaleDateString(navigator.language, options)
  const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`
  return (
    <tr>
      <td>
        {season.colors.map((color, index) => (
            <Color key={`${startDate}-${color}-${index}`} color={color} />
        ))}
      </td>
      <td>{season.name}</td>
      <td>{date}</td>
      <td>
        {season.alternateColors.map((color, index) => (
            <Color key={`${startDate}-alt-${color}-${index}`} color={color} />
        ))}
      </td>
    </tr>
  );
}

export default Season;

