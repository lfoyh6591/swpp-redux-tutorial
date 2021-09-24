import React from 'react';

import './RealDetail.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/action/index';

class RealDetail extends React.Component {

  componentDidMount(){
      this.props.onGetTodo(parseInt(this.props.match.params.id));
  }
  render() {
    let title = '';
    let content = '';
    if(this.props.selectedTodo){
        title = this.props.selectedTodo.title;
        content = this.props.selectedTodo.content;
    }
    return (
      < div className="TodoDetail" >
        <div className="row">
          <div className="left">
            Name:
        </div>
          <div className="right">
            {title}
          </div>
        </div>

        <div className="row">
          <div className="left">
            Content:
        </div>
          <div className="right">
              {content}
          </div>
        </div>
      </div >
    );
  }
};

const mapStateToProps = state => {
    return {
        selectedTodo: state.td.selectedTodo,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTodo: id =>
            dispatch(actionCreators.getTodo(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);