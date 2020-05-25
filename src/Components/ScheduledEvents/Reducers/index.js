import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
    loading:false,
    scheduleEvents:[],
}
const getScheduleSuccess = (state,action) => {
    return {
        ...state,
        loading:false,
        scheduleEvents:action.payload,
    }
}
const getScheduleFail = (state,action) => {
    return {
        ...state,
        loading:false,

    }
}
const getSchedule = (state,action) => {
    return {
        ...state,
        loading:true,
    }
}

const createScheduleSuccess = (state,action) => {
    return {
        ...state,
        loading:false,
        createSchedule:true,
    }
}
const createScheduleFail = (state,action) => {
    return {
        ...state,
        loading:false,
        createSchedule:false,

    }
}
const createSchedule = (state,action) => {
    return {
        ...state,
        loading:true,
        createSchedule:null,

    }
}

const resetAppointments = (state,action) => {
    return {
        ...state,
        createSchedule:null
    }
}

const scheduleEvents = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SCHEDULE_EVENTS_FAILURE:
            return createScheduleFail(state,action);
        case actionTypes.CREATE_SCHEDULE_EVENTS_SUCCESS:
            return createScheduleSuccess(state,action);
        case actionTypes.CREATE_SCHEDULE_EVENTS:
            return createSchedule(state,action);

        case actionTypes.GET_SCHEDULED_EVENTS_SUCCESS:
            return getScheduleSuccess(state,action);
        case actionTypes.GET_SCHEDULED_EVENTS_FAILURE:
            return getScheduleFail(state,action);
        case actionTypes.GET_SCHEDULED_EVENTS:
            return getSchedule(state,action);
        case actionTypes.RESET_APPOINTMENTS:
            return resetAppointments(state,action)
        default:
            return state;
    }
};

export  default scheduleEvents