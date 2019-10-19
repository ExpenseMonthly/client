import {
    SET_LOGIN_STATUS,
} from './actionTypes.js'

export const setLoginStatus = (status) => {
    return function (dispatch) {
        dispatch({ type: SET_LOGIN_STATUS, isLogin: status })
    }
}
