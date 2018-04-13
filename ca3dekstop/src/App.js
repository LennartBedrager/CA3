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
      <div className="container top-buffer">
      <div className="jumbotron vertical-center">
      <div className="container text-center">
      <h1>Welcome to our Website!</h1>
      <h4>Rollefordelinger:</h4>
      <h5>Backend: Oliver</h5>
      <h5>React: Oliver, Kasper</h5>
      <h5>React-Native: Oliver</h5>
      </div>
        {!this.state.loggedIn ? (<LogIn login={this.login}/>) :
          ( <div>
              <LoggedIn logout={this.logout}/>
            </div>)}
        </div>
      </div>
    )
  }
}
export default App;