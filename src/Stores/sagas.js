import { all } from "redux-saga/effects";
import eventType from "../Components/EventTypes/Sagas/";
import Auth from "../Components/Auth/Sagas/";
import Appointments from "../Components/Appointments/Sagas/";
import ScheduleEvents from "../Components/ScheduledEvents/Sagas/";
export default function* root() {
    yield all([
        ...eventType,
        ...Auth,
        ...Appointments,
        ...ScheduleEvents
    ]);
}