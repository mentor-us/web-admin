import dayGridPlugin from "@fullcalendar/daygrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

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
      <div className="w-80 flex flex-col sub-calendar">
        <div className="">Select kind event</div>
        <div className="grow p-2">
          <FullCalendar
            height="300px"
            aspectRatio={1.7}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "prev",
              center: "title",
              end: "next"
            }}
            weekends
          />
        </div>
      </div>
      <div className="grow p-5">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            end: "today prev,next"
          }}
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
