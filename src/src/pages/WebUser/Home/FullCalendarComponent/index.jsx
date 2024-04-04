/* eslint-disable react/button-has-type */
// import { useEffect, useRef, useState } from "react";
import { useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import BookMeetingDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import { useGetAllEvents } from "hooks/events/queries";
import { MESSAGE_TYPE } from "utils/constants";
import { formatDate } from "utils/dateHelper";

import viLocale from "./vi";
import "./index.css";

// eslint-disable-next-line import/prefer-default-export
export function FullCalendarComponent() {
  const { data: events, isLoading, isSuccess } = useGetAllEvents();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogMeeting, setOpenDialogMeeting] = useState(false);
  const [msgIdDialog, setMsgIdDialog] = useState(null);

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
    const element = document.querySelector(".fc-popover-close");
    console.log(element);
    if (element) {
      element.click();
    }
    // eslint-disable-next-line eqeqeq
    switch (event?.event?.extendedProps?.type) {
      case MESSAGE_TYPE.TASK:
        setOpenDialog(true);
        setMsgIdDialog(event.event.id);
        break;
      case MESSAGE_TYPE.MEETING:
        setOpenDialogMeeting(true);
        setMsgIdDialog(event.event.id);
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex h-full w-full calendar-page">
      <div className="w-80 flex flex-col sub-calendar">
        <div className="grow p-2">
          <div className="text-center text-3xl p-3">
            <strong>Lịch vạn niên</strong>
          </div>
          <div className="calendar-wraper p-2 rounded-lg">
            <FullCalendar
              height="330px"
              locale={viLocale}
              dayHeaderFormat={{ weekday: "narrow" }}
              plugins={[dayGridPlugin, interactionGridPlugin]}
              initialView="dayGridMonth"
              events={[]}
              dateClick={(date) => handleChoseDateMiniCalendar(date)}
              headerToolbar={{
                start: "prev",
                center: "title",
                end: "next"
              }}
              weekends
              customButtons={{
                customNextButton: {
                  text: "My Next", // You can use any text or HTML for your button
                  click() {
                    // Handle click event for your custom button
                    alert("Custom next button clicked!");
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="grow py-5 main-calendar">
        <FullCalendar
          ref={mainCalendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
          initialView="dayGridMonth"
          dayHeaderFormat={{ weekday: "short" }}
          locale={viLocale}
          headerToolbar={{
            start: "title",
            center: "",
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
      {openDialog && (
        <CreateTaskDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          taskId={msgIdDialog}
        />
      )}
      {openDialogMeeting && (
        <BookMeetingDialog
          open={openDialogMeeting}
          handleClose={() => setOpenDialogMeeting(false)}
          meetingId={msgIdDialog}
        />
      )}
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
