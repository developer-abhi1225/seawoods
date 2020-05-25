import * as actionTypes from '../../../Constants/actionTypes'
export const userLogin = payload => async dispatch => {
    dispatch({
        type:actionTypes.LOGIN,
        payload: payload
    })
}

export const createUser = payload => async dispatch => {
    dispatch({
        type:actionTypes.CREATE_USER,
        payload: payload
    })
}
export const resetAuth = payload => async dispatch => {
    dispatch({
        type:actionTypes.RESET_AUTH,
        payload: payload
    })
}
