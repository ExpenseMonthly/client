import {
    SET_LOGIN_STATUS,
    GET_TRANSACTION_RANGE,
    SET_USER
} from './actionTypes.js'

export const setLoginStatus = (status) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({ type: SET_LOGIN_STATUS, isLogin: status })
            resolve()
        })
    }
}

export const setUser = (user) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({ type: SET_USER, user })
            resolve()
        })
    }
}

export const getTransactionRange = (startDate, endDate) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({ type: GET_TRANSACTION_RANGE, data: [] })
            resolve()
        })
    }
}