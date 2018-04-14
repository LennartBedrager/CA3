import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
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

export default class LogIn extends Component {
  
  handleSubmit = () => {
    var value = this.refs.form.getValue();
    if (value) {
      this.props.login(value.username, value.password);
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