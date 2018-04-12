import React, {Component} from 'react';
import {
    Route,
    NavLink
} from 'react-router-dom';
import facade from "../FetchFacades/LoginFacade";
import Competitions from '../Components/Competitions';

export default class LoggedIn extends Component {
    constructor(props) {
      super(props);
      this.state= {dataFromServer: "Fetching!!"};
    }
  
    componentDidMount(){
      facade.fetchData().then(res=> this.setState({dataFromServer: res}));
    }

    render() {
      return (
        <div>
        <div className="container text-center">
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
        <div className="col-sm-4 col-sm-offset-4">
        <NavLink className="btn btn-primary" exact to="/" onClick={this.props.logout}>Logout</NavLink>
        </div>
        </div>
        <Route path="/" render={({match}) => <Competitions match={match} />}/>
        </div>
      )
    }
  }