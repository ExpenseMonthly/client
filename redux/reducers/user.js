import { SET_LOGIN_STATUS, SET_USER } from '../actionTypes';

const initialState = {
    isLogin: false,
    user: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return { ...state, isLogin: action.isLogin }
        case SET_USER:
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default user 