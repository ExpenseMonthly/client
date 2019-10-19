import transaction from './transaction.js'
import user from './user'
import transaction from './transaction'
import { combineReducers } from 'redux'

export default combineReducers({
    transaction,
    user
})