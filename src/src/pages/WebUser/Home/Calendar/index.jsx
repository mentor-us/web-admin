import React from "react";

import EventApi from "api/EventApi";

export default function Calendar() {
  const data = EventApi.getSchedulesData();
  console.log(data);
  return <div>Calendar</div>;
}
