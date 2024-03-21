import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

import { useGetAllEvents } from "hooks/events/queries";
import { formatDate } from "utils/dateHelper";

import "./index.css";

// eslint-disable-next-line import/prefer-default-export
export function FullCalendarComponent() {
  const { data: events, isLoading, isSuccess } = useGetAllEvents();
  if (isLoading) {
    return <div className="">isLoading</div>;
  }
  if (!isSuccess) {
    return <div className="">Error</div>;
  }
  return (
    <div className="flex h-full w-full">
      <div className="grow">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends
          events={[...events]}
          // eslint-disable-next-line no-use-before-define
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventData) {
  return (
    <div className="event-item flex flex-row justify-start text-left bg-sky-300 hover:bg-sky-400 w-full p-1 pl-2 rounded-lg">
      <b className="align-middle">
        {formatDate(eventData.event.extendedProps.timeStart ?? "", "time")}:
      </b>
      <span className="ml-1 truncate">{eventData.event.title}</span>
    </div>
  );
}
