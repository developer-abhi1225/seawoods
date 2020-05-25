import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
    loading:false,
    updateStatus:null,
    createStatus:null,
    updateData:{},
    event_types:[]
}

const getEventTypesSuccess = (state,action) => {
    return {
        ...state,
        event_types:action.payload,
        loading:false
    }
}
const getEventTypesFail = (state,action) => {
    return {
        ...state,
        loading:false
    }
}
const getEventTypes = (state,action) => {
    return {
        ...state,
        loading:true,
        updateStatus: null,
        createStatus: null,
    }
}

const updateEventTypesSuccess = (state,action) => {
    return {
        ...state,
        updateData: action.payload,
        updateStatus: true,
    }
}
const updateEventTypesFail = (state,action) => {
    return  {
        ...state,
        updateData: action.payload,
        updateStatus: false,
    }
}
const updateEventTypes = (state,action) => {
    return {
        ...state,
        updateStatus:null
    }
}

const addEventTypesSuccess = (state,action) => {
    return {
        ...state,
        createStatus: true,
    }
}
const addEventTypesFail = (state,action) => {
    return  {
        ...state,
        createStatus: false,
    }
}
const addEventTypes = (state,action) => {
    return {
        ...state,
        createStatus:null
    }
}
const eventTypes = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_EVENT_TYPES_SUCCESS:
            return getEventTypesSuccess(state,action);
        case actionTypes.GET_EVENT_TYPES_FAIL:
            return getEventTypesFail(state,action);
        case actionTypes.GET_EVENT_TYPES:
            return getEventTypes(state,action);

        case actionTypes.UPDATE_EVENT_TYPES_SUCCESS:
            return updateEventTypesSuccess(state,action);
        case actionTypes.UPDATE_EVENT_TYPES_FAIL:
            return updateEventTypesFail(state,action);
        case actionTypes.UPDATE_EVENT_TYPES:
            return updateEventTypes(state,action);

        case actionTypes.ADD_EVENT_TYPES_SUCCESS:
            return addEventTypesSuccess(state,action);
        case actionTypes.ADD_EVENT_TYPES_FAIL:
            return addEventTypesFail(state,action);
        case actionTypes.ADD_EVENT_TYPES:
            return addEventTypes(state,action);

        default:
            return state;
    }
};

export  default eventTypes