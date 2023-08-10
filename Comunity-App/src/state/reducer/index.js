import { combineReducers } from "redux"
import amountReducer from "./amountReducer"
const reducers =combineReducers({
    details :amountReducer,
    serverConnected:amountReducer

})
export default reducers  