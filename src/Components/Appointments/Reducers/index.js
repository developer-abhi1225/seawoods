import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
    loading:false,
    userDetails:{},
}

const getUserSuccess = (state,action) => {
    return {
        ...state,
        userDetails:action.payload,
        loading:false,
    }
}
const getUserFail = (state,action) => {
    return {
        ...state,
        loading:false
    }
}
const getUser = (state,action) => {
    return {
        ...state,
        loading:true,
    }
}



const appointments = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DETAILS:
            return getUser(state,action);
        case actionTypes.GET_USER_DETAILS_SUCCESS:
            return getUserSuccess(state,action);
        case actionTypes.GET_USER_DETAILS_FAIL:
            return getUserFail(state,action);

        default:
            return state;
    }
};

export  default appointments