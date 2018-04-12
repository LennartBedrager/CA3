import React, { Component } from "react"
import {
  NavLink
} from 'react-router-dom';
import facade from "./FetchFacades/LoginFacade";
import LogIn from './Login/LogIn';
import LoggedIn from './Login/LoggedIn';

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false }
  }
  
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }

  login = (user, pass) => {
    facade.login(user,pass)
    .then(res =>this.setState({ loggedIn: true }));
  }

  render() {
    return (
      <div className="container">
      <div className="jumbotron vertical-center">
      <div className="container text-center">
      <h1>Welcome to our Website!</h1>
      </div>
        {!this.state.loggedIn ? (<LogIn login={this.login}/>) :
          ( <div>
              <LoggedIn />
              <div className="container text-center">
              <div className="col-sm-4 col-sm-offset-4">
              <NavLink className="btn btn-primary" exact to="/" onClick={this.logout}>Logout</NavLink>
              </div>
              </div>
            </div>)}
        </div>
      </div>
    )
  }
}
export default App;