import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index.js'
import ReduxThunk from 'redux-thunk'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(ReduxThunk))
)

export default store