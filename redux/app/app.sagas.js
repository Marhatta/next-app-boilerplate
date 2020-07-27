import { takeLatest, call, put, all } from "redux-saga/effects";
import { getTodosSuccess, getTodosFailure } from "./app.actions";
import { GET_TODOS } from "./app.types";
import axios from "axios";

/** @generator fetchTodosAsync() 
 *  @description Calls an API to fetch a list of todos
 */
export function* fetchTodosAsync() {
  try {
    let todos = yield axios.get("https://jsonplaceholder.typicode.com/todos");
    yield put(getTodosSuccess(todos.data));
  } catch (error) {
    yield put(getTodosFailure(error));
  }
}

export function* fetchTodos() {
  yield takeLatest(GET_TODOS, fetchTodosAsync);
}

export function* appSagas() {
  yield all([call(fetchTodos)]);
}
