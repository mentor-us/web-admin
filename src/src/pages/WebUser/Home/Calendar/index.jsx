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

import { CALENDAR_ID, SECRECT_API_KEY_CALENDAR } from "config";
// import EventApi from "api/EventApi";

export default function Calendar() {
  //   const data = EventApi.getSchedulesData();
  //   console.log(data);
  const remoteData = new DataManager({
    url: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${SECRECT_API_KEY_CALENDAR}`,
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  function onDataBinding(e) {
    const items = e.result;
    const schedulerData = [];
    if (items.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const event of items) {
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
  return (
    <div className="flex flex-row">
      <div className="w-80">Mini calendar</div>
      <div className="">
        <ScheduleComponent
          width="70%"
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
