import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import {createScheduleEvent, getScheduleEvent, getUser} from "../Services";
//********************** GET USER ACTION ******************************************************** */
function* workerUserLogin(action) {
    try {
        const response = yield call(getUser, action.payload)
        if(response.status === 200){
            yield put({
                type:actionTypes.GET_USER_DETAILS_SUCCESS,
                payload:response.data
            })
        } else{
            yield put({
                type:actionTypes.GET_USER_DETAILS_FAIL,
                payload: {}
            })
        }
    } catch (err) {
        yield put({
            type:actionTypes.GET_USER_DETAILS_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchUserLogin() {
    yield takeLatest(actionTypes.GET_USER_DETAILS, workerUserLogin);
}

export default [
    fork(watchUserLogin),

];