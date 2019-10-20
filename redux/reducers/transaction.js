import { GET_TRANSACTION_RANGE } from '../actionTypes';

const initialState = {
    data: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTION_RANGE:
            return { ...state, data: action.data }

        default:
            return state
    }
}

export default user 