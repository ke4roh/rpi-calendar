import React, { useState } from "react";
import { Tooltip, type ITooltip } from "react-tooltip";
import { v4 as uuid } from 'uuid';
import type { Color as CalendarColor } from '../libs/christian-calendar';
const TooltipComponent = Tooltip as React.FC<ITooltip>;

interface ColorProps {
  color: CalendarColor;
}
const Color: React.FC<ColorProps> = ({ color }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipId = React.useMemo(() => `${uuid()}-color-tooltip`, []); // Ensures the ID doesn't change on every render.

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
      <div style={{
        display: 'inline-block',
        marginRight: 5,
        border: "1px solid black"
      }}>
        <div
            role={"img"}
            aria-label={color.name}
            style={{
              backgroundColor: color.rgb,
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-tooltip-id={tooltipId}
            data-tooltip-content={color.name}
        >&nbsp;
        </div>
        <TooltipComponent
            id={tooltipId}
            place="top"
            clickable={false}
            isOpen={isTooltipVisible}
        />
      </div>
  );
};

export default Color;
