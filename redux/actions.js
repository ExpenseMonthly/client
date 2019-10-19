import {
    SET_LOGIN_STATUS,
} from './actionTypes.js'
import Axios from 'axios'

export const login = () => {
    return function (dispatch) {
        dispatch({ type: SET_LOGIN_STATUS, isLogin: true })
    }
}
