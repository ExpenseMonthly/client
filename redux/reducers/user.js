import { SET_LOGIN_STATUS } from '../actionTypes';

const initialState = {
    isLogin: false,
    user: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return { ...state, isLogin: action.isLogin }

        default:
            return state
    }
}

export default user 