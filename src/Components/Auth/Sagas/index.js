import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import {createUser, getUser} from "../Services";
//********************** USER LOGIN ACTION ******************************************************** */
function* workerUserLogin(action) {
    try {
       const response = yield call(getUser, action.payload)
       if(response.status === 200 && response.data.length === 1){
           yield put({
               type:actionTypes.LOGIN_SUCCESS,
               payload:response.data[0]
           })
       } else{
           yield put({
               type:actionTypes.LOGIN_FAIL,
               payload: {}
           })
       }
    } catch (err) {
        yield put({
            type:actionTypes.LOGIN_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchUserLogin() {
    yield takeLatest(actionTypes.LOGIN, workerUserLogin);
}

function* workerCreateUser(action) {
    try {
       const response = yield call(createUser, action.payload)
       if(response.status === 201){
           yield put({
               type:actionTypes.CREATE_USER_SUCCESS,
           })
       } else{
           yield put({
               type:actionTypes.CREATE_USER_FAIL,
               payload: {}
           })
       }
    } catch (err) {
        yield put({
            type:actionTypes.CREATE_USER_FAIL,
            payload: {}
        })
    }
}

// watch for event types action.
function* watchCreateUser() {
    yield takeLatest(actionTypes.CREATE_USER, workerCreateUser);
}


export default [
    fork(watchUserLogin),
    fork(watchCreateUser),
];