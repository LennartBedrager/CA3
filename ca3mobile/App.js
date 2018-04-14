import React, { Component } from 'react';
import { View } from 'react-native';
import facade from "./LoginFacade";
import LoggedIn from './Login/LoggedIn';
import LogIn from './Login/LogIn';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  logout = async () => {
    await facade.logout();
    this.setState({ loggedIn: false });
  }

  login = async (user, pass) => {
    await facade.login(user,pass)
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <View>
        {!this.state.loggedIn ? (<LogIn login={this.login}/>) :
          ( <View>
              <LoggedIn logout={this.logout}/>
            </View>)}
      </View>
    );
  }
}