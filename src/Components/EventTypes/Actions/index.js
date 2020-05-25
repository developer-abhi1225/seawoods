import * as actionTypes from '../../../Constants/actionTypes'
export const requestEventTypes = payload => async dispatch => {
    dispatch({
        type:actionTypes.GET_EVENT_TYPES,
        payload: payload
    })
}
export const updateEventTypes = payload => async dispatch => {
    dispatch({
        type:actionTypes.UPDATE_EVENT_TYPES,
        payload: payload
    })
}
export const addEventTypes = payload => async dispatch => {
    dispatch({
        type:actionTypes.ADD_EVENT_TYPES,
        payload: payload
    })
}