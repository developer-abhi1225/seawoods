import * as actionTypes from '../../../Constants/actionTypes'
export const getUserDetails = payload => async dispatch => {
    dispatch({
        type:actionTypes.GET_USER_DETAILS,
        payload: payload
    })
}

export const resetAppointments = payload => async dispatch => {
    dispatch({
        type:actionTypes.RESET_APPOINTMENTS,
        payload: payload
    })
}
