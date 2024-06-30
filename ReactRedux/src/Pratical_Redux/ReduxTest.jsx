import {
  legacy_createStore as createStores,
  applyMiddleware,
  combineReducers,
  bindActionCreators,
} from "redux";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";

export default function ReduxTest() {
  const CAKE_ORDERED = "CAKE_ORDERED";
  const RESTOCK_CAKE = "RESTOCK_CAKE";

  const initialState = {
    numOfCakes: 10,
  };
  function orderCake() {
    return {
      type: CAKE_ORDERED,
    };
  }
  function restockCake(qty = 1) {
    return {
      type: RESTOCK_CAKE,
      payload: qty,
    };
  }

  const cakeReducer = (state = initialState, action) => {
    switch (action.type) {
      case CAKE_ORDERED: {
        return {
          ...state,
          numOfCakes: state.numOfCakes - 1,
        };
      }
      case RESTOCK_CAKE: {
        return {
          ...state,
          numOfCakes: state.numOfCakes + action.payload,
        };
      }
      default:
        return state;
    }
  };

  // Async action

  //initial state for async action
  const asyncStateInit = {
    loading: false,
    data: [],
    error: "",
  };

  // Définis les constantes
  const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
  const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
  const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

  // Définis les créateurs d' actions

  function fetchRequest() {
    return {
      type: FETCH_USER_REQUEST,
    };
  }
  function fetchSuccess(users) {
    return {
      type: FETCH_USER_SUCCESS,
      payload: users,
    };
  }
  function fetchFailure(error) {
    return {
      type: FETCH_USER_FAILURE,
      payload: error,
    };
  }

  // Définit le reducer

  function asyncReducer(state = asyncStateInit, action) {
    switch (action.type) {
      case FETCH_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  // Définit l' action thunk

  function fetchUsers() {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:3000/users")
        .then((res) => {
          if (!res.ok) {
            throw new Error("invalid request");
          }
          return res.json();
        })
        .then((data) => {
          const users = data.map((d) => d.id);
          dispatch(fetchSuccess(users));
        })
        .catch((error) => {
          dispatch(fetchFailure(error.message));
        });
    };
  }
  const reducer = combineReducers({
    cake: cakeReducer,
    users: asyncReducer,
  });

  const logger = createLogger();
  const store = createStores(reducer, applyMiddleware(logger, thunk));
  const actions = bindActionCreators(
    { orderCake, restockCake, fetchUsers },
    store.dispatch
  );

  console.log("initial state: ", store.getState());

  const unsuscribe = store.subscribe(() =>
    console.log("updated state: ", store.getState())
  );

  actions.orderCake();
  actions.orderCake();
  actions.orderCake();
  actions.restockCake(3);
  actions.fetchUsers();

  unsuscribe();

  return <div>Redux</div>;
}
