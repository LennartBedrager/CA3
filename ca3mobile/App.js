import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import facade from "./LoginFacade";
import t from 'tcomb-form-native';

const Form = t.form.Form

const User = t.struct({
  username: t.String,
  password: t.String
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

class LogIn extends Component {
  
  handleSubmit = async () => {
    var value = this.refs.form.getValue();
    if (value) {
      await this.props.login(value.username, value.password);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form type={User} ref="form" />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state= {dataFromServer: "Fetching!!"};
  }

  componentDidMount(){
    facade.fetchData().then(res=> this.setState({dataFromServer: res}));
  }
  
  render() {
    return (
      <View>
        <Text>Data Received from server</Text>
        <Text>{this.state.dataFromServer}</Text>
      </View>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }

  login = async (user, pass) => {
    await facade.login(user,pass)
  }

  render() {
    return (
      <View>
        {!this.state.loggedIn ? (<LogIn login={this.login}/>) :
          ( <div>
              <LoggedIn />
              <Button title="Logout" onPress={this.logout} />
            </div>)}
      </View>
    );
  }
}