import EventApi from "api/EventApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllEvent = (params) => EventApi.getSchedulesData(params);

const EventService = {
  getAllEvent
};
export default ErrorWrapper(EventService);
