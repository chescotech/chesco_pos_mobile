import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ActionsReducer from "./src/reducers/Actions";
import SocketConfigReducer from "./src/reducers/sockets/SocketConfig";
import UserReducer from "./src/reducers/User";

const AllReducers = combineReducers({
  SocketConfig: SocketConfigReducer,
  Actions: ActionsReducer,
  User: UserReducer,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
