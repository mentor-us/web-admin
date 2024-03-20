import React from "react";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import {
  Agenda,
  Day,
  Inject,
  Month,
  MonthAgenda,
  ScheduleComponent,
  TimelineMonth,
  TimelineViews,
  Week,
  WorkWeek
} from "@syncfusion/ej2-react-schedule";

import { API_URL, CALENDAR_ID, SECRECT_API_KEY_CALENDAR } from "config";

import { useGetAllEvents } from "hooks/events/queries";
// import EventApi from "api/EventApi";
// const URL_FETCH_EVENT = `${API_URL}/api/events/own`;
const URL_SYNC = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${SECRECT_API_KEY_CALENDAR}`;
// const URL_EXAMPLE_DATA = `https://js.syncfusion.com/demos/ejserveices/api/Schedule/LoadData`;
export default function Calendar() {
  const { data: events, isLoading, isSuccess } = useGetAllEvents();
  if (isLoading) {
    return <div className="">isLoading</div>;
  }
  //   const data = EventApi.getSchedulesData();
  console.log(events);
  console.log(API_URL);
  console.log(URL_SYNC);
  const remoteData = new DataManager({
    // data: events,
    url: URL_SYNC,
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  function onDataBinding(e) {
    console.log("onDataBinding");
    console.log(e);
    const data = e.result;
    const { items } = data;

    const schedulerData = [];
    if (items.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const event of items) {
        // console.log(event);

        const isAllDay = !event.start.dateTime;
        let start = event.start.dateTime;
        let end = event.end.dateTime;
        if (isAllDay) {
          start = event.start.date;
          end = event.end.date;
        }
        schedulerData.push({
          Id: event.id,
          Subject: event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          isAllDay
        });
      }
    }
    e.result = schedulerData;
  }
  if (isSuccess)
    return (
      <div className="flex flex-row">
        <div className="w-80">Mini calendar</div>
        <div className="grow h-full">
          <ScheduleComponent
            className="ml-5"
            width="100%"
            height="650px"
            eventSettings={{ dataSource: remoteData }}
            // eslint-disable-next-line react/jsx-no-bind
            dataBinding={onDataBinding}
            currentView="Month"
          >
            <Inject
              services={[
                Day,
                Week,
                WorkWeek,
                Month,
                Agenda,
                MonthAgenda,
                TimelineViews,
                TimelineMonth
              ]}
            />
          </ScheduleComponent>
        </div>
      </div>
    );
}
