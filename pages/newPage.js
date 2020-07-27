import Link from "next/link";
import {connect} from "react-redux";
import { getTodos } from "../redux/app/app.actions";
import PropTypes from 'prop-types';

/**
    @author [vishal marhatta]
    @see https://github.com/Marhatta/next-app-boilerplate
    @method NewPage
    @description Shows a list of todos when Get todo list button is pressed
    @returns jsx with a list of todos
 */

const NewPage = ({ getTodos,todos }) => {
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
    /**Prop type checking */
    getTodos:PropTypes.func.isRequired,
    todos:PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
  return {
    todos: state.app.todos,
  };
};

export default connect(mapStateToProps, { getTodos })(NewPage);
