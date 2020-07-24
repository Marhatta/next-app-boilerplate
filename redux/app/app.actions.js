import { GET_TODOS, GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from "./app.types";

export const getTodos = () => {
  return {
    type: GET_TODOS,
  };
};

export const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

export const getTodosFailure = (error) => {
  return {
    type: GET_TODOS_FAILURE,
    payload: error.response.data,
  };
};
