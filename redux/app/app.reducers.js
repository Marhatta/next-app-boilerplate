import { GET_TODOS, GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from "./app.types";

const initialState = {
  loadingTodos: false,
  loadingTodosSuccess: false,
  loadingTodosFailure: false,
  loadingTodosError: null,
  todos: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        loadingTodos: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loadingTodosSuccess: true,
        loadingTodos: false,
        todos: action.payload,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        loadingTodos: false,
        loadingTodosFailure: true,
        loadingTodosError: action.payload,
      };
    default:
      return { ...state };
  }
};
export default appReducer;
