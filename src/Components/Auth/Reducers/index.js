import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
    loading:false,
    userDetails:{},
    loginStatus:null,
    createStatus:null,
}

const loginSuccess = (state,action) => {
    localStorage.setItem("token",JSON.stringify(action.payload))
    return {
        ...state,
        userDetails:action.payload,
        loading:false,
        loginStatus:true,
    }
}
const loginFail = (state,action) => {
    return {
        ...state,
        loading:false
    }
}
const login = (state,action) => {
    return {
        ...state,
        loading:true,
        loginStatus: null
    }
}


const createSuccess = (state,action) => {
    return {
        ...state,
        loading:false,
        createStatus:true
    }
}
const createFail = (state,action) => {
    return {
        ...state,
        loading:false,
        createStatus:false
    }
}
const createUser = (state,action) => {
    return {
        ...state,
        loading:true,
        createStatus: null
    }
}

const reset = (state,action) => {
    return {
        ...state,
        ...initialState
    }
}


const Auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return login(state,action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state,action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state,action);

        case actionTypes.CREATE_USER:
            return createUser(state,action);
        case actionTypes.CREATE_USER_SUCCESS:
            return createSuccess(state,action);
        case actionTypes.CREATE_USER_FAIL:
            return createFail(state,action);
        case actionTypes.RESET_AUTH:
            return reset(state,action)
        default:
            return state;
    }
};

export  default Auth