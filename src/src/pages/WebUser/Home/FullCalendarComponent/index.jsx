/* eslint-disable react/button-has-type */
// import { useEffect, useRef, useState } from "react";
import { useRef } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import TodayIcon from "@mui/icons-material/Today";

import { useGetAllEvents } from "hooks/events/queries";
import { formatDate } from "utils/dateHelper";

import "./index.css";

// eslint-disable-next-line import/prefer-default-export
export function FullCalendarComponent() {
  const { data: events, isLoading, isSuccess } = useGetAllEvents();
  // const [openModalDetail, setOpenModalDetail] = useState(false);
  // const propsModal = useRef(null);
  const mainCalendarRef = useRef(null);
  if (isLoading) {
    return <div className="">isLoading</div>;
  }
  if (!isSuccess) {
    return <div className="">Error</div>;
  }
  const handleChoseDateMiniCalendar = (date) => {
    mainCalendarRef.current.getApi().gotoDate(date.dateStr);
    mainCalendarRef.current.getApi().select(date.dateStr);
  };
  const handleClickEvent = (event) => {
    // showModal
    console.log("handleClickEvent");
    console.log(event.event);
    console.log(event.event.id);
  };
  return (
    <div className="flex h-full w-full">
      <div className="w-80 flex flex-col sub-calendar">
        <div className="">
          Select kind event1
          <TodayIcon />
        </div>
        <div className="grow p-2">
          <FullCalendar
            height="350px"
            plugins={[dayGridPlugin, interactionGridPlugin]}
            initialView="dayGridMonth"
            events={[]}
            dateClick={(date) => handleChoseDateMiniCalendar(date)}
            headerToolbar={{
              start: "prev",
              center: "title",
              end: "today,next"
            }}
            // buttonIcons={{
            //   // prev: "chevron-right"
            //   // next: "chevron-left"
            // }}
            weekends
            // eventContent
          />
        </div>
      </div>
      <div className="grow p-5 main-calendar">
        <FullCalendar
          ref={mainCalendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            omitZeroMinute: false,
            hour12: false // Set to false for 24-hour format
          }}
          dateClick={(date) => {
            console.log("dateClick");
            console.log(date);
          }}
          eventClick={(event) => handleClickEvent(event)}
          dayMaxEvents={2}
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
    <>
      {/* // <div className="event-item flex flex-row justify-start text-left bg-sky-300 hover:bg-sky-400 w-full p-1 pl-2 rounded-lg"> */}
      <b className="col-12">{formatDate(eventData.event.extendedProps.timeStart ?? "", "time")}:</b>
      <span className="ml-1 truncate block">{eventData.event.title}</span>
      {/* // </div> */}
    </>
  );
}