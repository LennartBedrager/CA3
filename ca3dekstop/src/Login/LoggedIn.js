import React, {Component} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import facade from "../FetchFacades/LoginFacade";
import Competitions from '../Components/Competitions';
import Teams from '../Components/Teams';

const NoMatch = ({ location }) => (
    <div>
      <h2>
        No match for {location.pathname}
      </h2>
    </div>
  );

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
        <h2 >Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
        </div>
        <Route path="/" render={() => <Competitions />}/>
        </div>
      )
    }
  }