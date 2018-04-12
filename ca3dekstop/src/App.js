import React, { Component } from "react"
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
      <div>
        {!this.state.loggedIn ? (<LogIn login={this.login}/>) :
          ( <div>
              <LoggedIn />
              <br/><br/>
              <button onClick={this.logout}>Logout</button>
            </div>)}
      </div>
    )
  }
}
export default App;