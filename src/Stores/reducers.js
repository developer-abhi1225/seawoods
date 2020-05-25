import { combineReducers } from "redux";
import eventTypes from "../Components/EventTypes/Reducers";
import auth from "../Components/Auth/Reducers";
import appointments from "../Components/Appointments/Reducers";
import scheduleEvents from "../Components/ScheduledEvents/Reducers"
const appReducer = combineReducers({
    eventTypes,
    auth,
    appointments,
    scheduleEvents

});
export default appReducer