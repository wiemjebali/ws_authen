import reducer from "./reducer";
import {applyMiddleware, createStore} from "redux"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

const middleware = [thunk]


const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store