import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ActionsReducer from "./src/reducers/Actions";
import SocketConfigReducer from "./src/reducers/sockets/SocketConfig";

const AllReducers = combineReducers({
  SocketConfig: SocketConfigReducer,
  Actions: ActionsReducer,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
