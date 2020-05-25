import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import {getEventTypes, updateEventTypes ,addEventTypes} from "../Services";
//********************** GET EVENT TYPES ACTION ******************************************************** */
function* workerGetEventTypes(action) {
    try {
       const response = yield call(getEventTypes, action.payload)
       if(response.status === 200){
           yield put({
               type:actionTypes.GET_EVENT_TYPES_SUCCESS,
               payload:response.data
           })
       } else{
           yield put({
               type:actionTypes.GET_EVENT_TYPES_FAIL,
               payload: {}
           })
       }
    } catch (err) {
        yield put({
            type:actionTypes.GET_EVENT_TYPES_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchGetEventTypes() {
    yield takeLatest(actionTypes.GET_EVENT_TYPES, workerGetEventTypes);
}


//********************** UPDATE EVENT TYPES ACTION ******************************************************** */
function* workerUpdateEventTypes(action) {
    try {
        const response = yield call(updateEventTypes, action.payload)
        if(response.status === 200){
            yield put({
                type:actionTypes.UPDATE_EVENT_TYPES_SUCCESS,
                payload:{}
            })
        } else{
            yield put({
                type:actionTypes.UPDATE_EVENT_TYPES_FAIL,
                payload: {}
            })
        }
    } catch (err) {
        yield put({
            type:actionTypes.UPDATE_EVENT_TYPES_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchUpdateEventTypes() {
    yield takeLatest(actionTypes.UPDATE_EVENT_TYPES, workerUpdateEventTypes);
}

//********************** ADD EVENT TYPES ACTION ******************************************************** */
function* workerAddEventTypes(action) {
    try {
        const response = yield call(addEventTypes, action.payload)
        if(response.status === 201){
            yield put({
                type:actionTypes.ADD_EVENT_TYPES_SUCCESS,
                payload:{}
            })
        } else{
            yield put({
                type:actionTypes.ADD_EVENT_TYPES_FAIL,
                payload: {}
            })
        }
    } catch (err) {
        yield put({
            type:actionTypes.ADD_EVENT_TYPES_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchAddEventTypes() {
    yield takeLatest(actionTypes.ADD_EVENT_TYPES, workerAddEventTypes);
}

export default [
    fork(watchGetEventTypes),
    fork(watchUpdateEventTypes),
    fork(watchAddEventTypes),
];