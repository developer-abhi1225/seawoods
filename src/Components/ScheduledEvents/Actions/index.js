import * as actionTypes from "../../../Constants/actionTypes";

export const getScheduledEvents = payload => async dispatch => {
    dispatch({
        type:actionTypes.GET_SCHEDULED_EVENTS,
        payload: payload
    })
}

export const createScheduleEvent = payload => async dispatch => {
    dispatch({
        type:actionTypes.CREATE_SCHEDULE_EVENTS,
        payload: payload
    })
}