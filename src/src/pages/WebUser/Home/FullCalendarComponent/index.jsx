/* eslint-disable react/button-has-type */
// import { useEffect, useRef, useState } from "react";
import { useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, CircularProgress } from "@mui/material";

import BookMeetingDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import { useGetAllEvents } from "hooks/events/queries";
import { MESSAGE_TYPE } from "utils/constants";
import { formatDate, getMomentTime } from "utils/dateHelper";

import EventUpcoming from "./EventUpcoming/index";
import Note from "./Note";
import viLocale from "./vi";
import "./notion.scss";
// eslint-disable-next-line import/prefer-default-export
export function FullCalendarComponent() {
  const { data: events, isLoading, isSuccess } = useGetAllEvents();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogMeeting, setOpenDialogMeeting] = useState(false);
  const [msgIdDialog, setMsgIdDialog] = useState(null);
  const upcomingEvent =
    events && events.length
      ? events.filter((event) => getMomentTime(event.upcomingTime) === "hôm nay")
      : [];
  const mainCalendarRef = useRef(null);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!isSuccess) {
    return <div className="">Error</div>;
  }
  const handleChoseDateMiniCalendar = (date) => {
    mainCalendarRef.current.getApi().gotoDate(date.dateStr);
    mainCalendarRef.current.getApi().select(date.dateStr);
  };
  const handleClickEvent = (event) => {
    const element = document.querySelector(".fc-popover-close");
    if (element) {
      element.click();
    }
    const eventType = event?.event?.extendedProps?.type ?? event?.event?.type;
    switch (eventType) {
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
      <div className="w-52 flex flex-col sub-calendar bg-gray-100">
        <div className="h-full grow flex flex-col">
          <div className="text-center h-11" />
          <div className="calendar-wraper p-2 rounded-lg">
            <FullCalendar
              height="224px"
              locale={viLocale}
              dayHeaderFormat={{ weekday: "narrow" }}
              plugins={[dayGridPlugin, interactionGridPlugin]}
              initialView="dayGridMonth"
              events={[]}
              dateClick={(date) => handleChoseDateMiniCalendar(date)}
              headerToolbar={{
                start: "title",
                center: "test",
                end: "prev,next"
              }}
              titleFormat={{
                year: "numeric",
                month: "2-digit"
              }}
              weekends
            />
          </div>
          <hr />
          <div className="grow overflow-y-hidden p-2 text-xs flex flex-col">
            <Note />
            <span className="text-blue-500 pb-1">
              <strong className="font-bold uppercase">Hôm nay</strong> {formatDate(new Date())}
            </span>
            <div className="lg:block overflow-y-auto">
              {upcomingEvent.map((event) => (
                <EventUpcoming handleClickEvent={(e) => handleClickEvent(e)} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="main-calendar bg-white ">
        <FullCalendar
          ref={mainCalendarRef}
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
          initialView="dayGridMonth"
          dayHeaderFormat={{ weekday: "long" }}
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
            hour12: false
          }}
          eventClick={(event) => handleClickEvent(event)}
          dayMaxEvents={2}
          weekends
          titleFormat={{
            year: "numeric",
            month: "2-digit"
          }}
          events={[...events]}
          // eslint-disable-next-line no-use-before-define
          eventContent={renderEventContent}
          eventDidMount={(info) => {
            info.el.addEventListener("mouseenter", () => {
              const popoverEl = info.el.querySelector(".fc-popover");
              if (popoverEl) {
                const rect = popoverEl.getBoundingClientRect();
                const bodyRect = document.body.getBoundingClientRect();
                if (rect.right > bodyRect.right) {
                  popoverEl.style.right = "0";
                  popoverEl.style.left = "auto";
                }
                if (rect.bottom > bodyRect.bottom) {
                  popoverEl.style.bottom = "0";
                  popoverEl.style.top = "auto";
                }
              }
            });
          }}
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
    <div key={`event-mentor-${eventData.event.id} flex flex-col w-full`}>
      <span className={`${eventData.event.extendedProps.type ?? ""}-mentor`}>
        {formatDate(eventData.event.extendedProps.timeStart ?? "", "time")}:
      </span>
      <strong className="truncate block text-xs">{eventData.event.title}</strong>
    </div>
  );
}
