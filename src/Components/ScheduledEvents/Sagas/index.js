import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import  {getScheduleEvent,createScheduleEvent} from "../Services";
//********************** CREATE SCHEDULE EVENT ACTION ******************************************************** */
function* workerCreateScheduleEvent(action) {
    try {
        const response = yield call(createScheduleEvent, action.payload)
        if(response.status === 201){
            yield put({
                type:actionTypes.CREATE_SCHEDULE_EVENTS_SUCCESS,
                payload:response.data
            })
        } else{
            yield put({
                type:actionTypes.CREATE_SCHEDULE_EVENTS_FAILURE,
                payload: {}
            })
        }
    } catch (err) {
        yield put({
            type:actionTypes.CREATE_SCHEDULE_EVENTS_FAILURE,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchCreateScheduleEvent() {
    yield takeLatest(actionTypes.CREATE_SCHEDULE_EVENTS, workerCreateScheduleEvent);
}

//********************** GET SCHEDULE EVENT ACTION ******************************************************** */
function* workerGetScheduleEvent(action) {
    try {
        const response = yield call(getScheduleEvent, action.payload)
        if(response.status === 200){
            yield put({
                type:actionTypes.GET_SCHEDULED_EVENTS_SUCCESS,
                payload:response.data
            })
        } else{
            yield put({
                type:actionTypes.GET_SCHEDULED_EVENTS_FAILURE,
                payload: {}
            })
        }
    } catch (err) {
        yield put({
            type:actionTypes.GET_SCHEDULED_EVENTS_FAILURE,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchGetScheduleEvent() {
    yield takeLatest(actionTypes.GET_SCHEDULED_EVENTS, workerGetScheduleEvent);
}
export default [
    fork(watchCreateScheduleEvent),
    fork(watchGetScheduleEvent),
];