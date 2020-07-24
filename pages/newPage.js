import Link from "next/link";
import {connect} from "react-redux";
import { getTodos } from "../redux/app/app.actions";
import PropTypes from 'prop-types'; 

const NewPage = ({ getTodos, todos }) => {
  return (
    <div>
      <button onClick={() => getTodos()}>Get todo list</button>
      <h1>this is a new page</h1>
      <Link href="/">
        <a>Go to home</a>
      </Link>
      <div>
        {todos.map((todo) => {
          return <h2 key={todo.id}>{todo.title}</h2>;
        })}
      </div>
    </div>
  );
};

NewPage.propTypes = {
    getTodos:PropTypes.func,
    todo:PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
  return {
    todos: state.app.todos,
  };
};

export default connect(mapStateToProps, { getTodos })(NewPage);
