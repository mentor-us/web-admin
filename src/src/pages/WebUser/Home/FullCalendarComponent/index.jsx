/* eslint-disable react/button-has-type */
// import { useEffect, useRef, useState } from "react";
import { useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import BookMeetingDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
// import { useGetAllEvents } from "hooks/events/queries";
import { MESSAGE_TYPE } from "utils/constants";
import { formatDate } from "utils/formatDate";

import viLocale from "./vi";
import "./notion.scss";

const eventsExample = [
  {
    title: "Event 1",
    start: "2024-04-11T10:00:00", // Start date and time of the
    timeStart: "2024-04-11T10:00:00", // Start date and time of the
    end: "2024-04-11T15:00:00" // End date and time of the event (optional)
    // You can include additional event properties as needed
    // For example: description, color, textColor, etc.
  },
  {
    title: "Event 2",
    start: new Date(), // Start date and time of the event
    timeStart: new Date(), // End date and time of the event (optional)
    end: "2024-04-11T23:00:00" // End date and time of the event (optional)
    // You can include additional event properties as needed
    // For example: description, color, textColor, etc.
  },
  {
    title: "Event 3",
    start: "2024-04-11T10:00:00", // Start date and time of the event
    timeStart: "2024-04-11T10:00:00", // Start date and time of the event
    end: "2024-04-11T15:00:00" // End date and time of the event (optional)
    // You can include additional event properties as needed
    // For example: description, color, textColor, etc.
  },
  {
    title: "Event 4",
    start: new Date(), // Start date and time of the event
    timeStart: new Date(), // Start date and time of the event
    end: "2024-04-11T23:00:00" // End date and time of the event (optional)
    // You can include additional event properties as needed
    // For example: description, color, textColor, etc.
  },
  {
    title: "Event 5",
    start: "2024-04-15T13:30:00",
    timeStart: "2024-04-15T13:30:00",
    end: "2024-04-15T16:00:00"
  }
  // Add more events as needed
];
// eslint-disable-next-line import/prefer-default-export
export function FullCalendarComponent() {
  // const { data: events, isLoading, isSuccess } = useGetAllEvents();
  const events = eventsExample;
  const isLoading = false;
  const isSuccess = true;
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
      <div className="w-52 flex flex-col sub-calendar bg-gray-100">
        <div className="grow">
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
          <div className="h-full overflow-x-auto p-2 text-xs flex flex-col">
            <span className="text-blue-500 pb-1">
              <strong className="font-bold uppercase">Hôm nay</strong> {formatDate(new Date())}
            </span>
            <div className="flex flex-row py-1 rounded bg-slate-300 cursor-pointer">
              <div className="flex justify-start max-w-4 max-h-5">
                <div className="list-item ml-7 mt-[-11px] mr-0  text-blue-600 text-3xl" />
              </div>
              <div className="flex flex-col">
                <div className="font-[400]">8:30 - 9:00 AM</div>
                <div className="font-bold">Hop nhom mentorUs</div>
              </div>
            </div>
            <div className="flex flex-row py-1 rounded hover:bg-slate-300 cursor-pointer">
              <div className="flex justify-start max-w-4 max-h-5">
                <div className="list-item ml-7 mt-[-11px] mr-0  text-blue-600 text-3xl" />
              </div>
              <div className="flex flex-col">
                <div className="font-[400]">8:30 - 9:00 AM</div>
                <div className="font-bold">Hop nhom mentorUs</div>
              </div>
            </div>
            <div className="flex flex-row py-1 rounded hover:bg-slate-300 cursor-pointer">
              <div className="flex justify-start max-w-4 max-h-5">
                <div className="list-item ml-7 mt-[-11px] mr-0  text-blue-600 text-3xl" />
              </div>
              <div className="flex flex-col">
                <div className="font-[400]">8:30 - 9:00 AM</div>
                <div className="font-bold">Hop nhom mentorUs</div>
              </div>
            </div>
            <div className="flex flex-row py-1 rounded hover:bg-slate-300 cursor-pointer">
              <div className="flex justify-start max-w-4 max-h-5">
                <div className="list-item ml-7 mt-[-11px] mr-0  text-blue-600 text-3xl" />
              </div>
              <div className="flex flex-col">
                <div className="font-[400]">8:30 - 9:00 AM</div>
                <div className="font-bold">Hop nhom mentorUs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-calendar bg-white w-[1382px] border-r-2 border-gray-200">
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
            hour12: false // Set to false for 24-hour format
          }}
          dateClick={(date) => {
            console.log("dateClick");
            console.log(date);
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
            // Ensure the popover is displayed inside the viewport
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
  console.log(eventData.event);
  return (
    <>
      {/* // <div className="event-item flex flex-row justify-start text-left bg-sky-300 hover:bg-sky-400 w-full p-1 pl-2 rounded-lg"> */}
      <span className="col-12">
        {formatDate(eventData.event.extendedProps.timeStart ?? "", "time")}:
      </span>
      <strong className="ml-1 truncate block">{eventData.event.title}</strong>
      {/* // </div> */}
    </>
  );
}
