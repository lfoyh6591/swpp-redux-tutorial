import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import './TodoList.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/action/actionType';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import * as actionCreators from '../../store/action/index';

class TodoList extends Component {
  state = {
    selectedTodo: null,
  }

  componentDidMount(){
    this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(td.id)}
        />);
    });

    let todo = null;
    if (this.state.selectedTodo) {
      todo = <TodoDetail
        title={this.state.selectedTodo.title}
        content={this.state.selectedTodo.content}
      />
    }
    return (
      <div className="TodoList">
        <div className="title">{this.props.title}</div>
        <div className="todos">{todos}</div>
        {todo}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos
  };
}

const mapDispatchToProps = dispatch => {
  return{
    onToggleTodo: (id) =>
      dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) =>
      dispatch(actionCreators.deleteTodo(id)),
    onGetAll: () => dispatch(actionCreators.getTodos()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));