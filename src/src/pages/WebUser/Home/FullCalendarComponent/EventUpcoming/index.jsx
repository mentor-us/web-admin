/* eslint-disable react/prop-types */
import React from "react";

import { formatDate } from "utils/dateHelper";

const formatTime = (event) => {
  const timeEnd = event.timeEnd ? formatDate(event.timeEnd, "time") : "";
  const timeStart = event.timeStart ? formatDate(event.timeStart, "time") : "";
  return [formatDate(event.upcomingTime, "time"), timeEnd || timeStart]
    .filter((e) => e)
    .join(" - ");
};
const getTextColorClass = (event) => {
  console.log(event);
  switch (event.type) {
    case "MEETING":
      return "text-blue-500";
    case "TASK":
      return "text-orange-500";
    default:
      return "text-black-500";
  }
};
// eslint-disable-next-line react/prop-types
function EventUpcoming({ event, handleClickEvent }) {
  // eslint-disable-next-line react/prop-types
  if (!event || !event.title) return null; // Return null if event is not provided or title is not available

  return (
    // eslint-disable-next-line react/prop-types, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => handleClickEvent({ event })}
      className={`flex flex-row py-1 rounded hover:bg-slate-300 cursor-pointer event-upcoming  ${getTextColorClass(
        event
      )}`}
      key={event.id}
    >
      <div className="flex justify-start max-w-4 max-h-5">
        <div className="list-item ml-7 mt-[-11px] mr-0 text-3xl" />
      </div>
      <div className="flex flex-col">
        <div className="font-[400]">{formatTime(event)}</div>
        <div className="font-bold text-xs">{event?.title ?? ""}</div>
      </div>
    </div>
  );
}

export default EventUpcoming;
