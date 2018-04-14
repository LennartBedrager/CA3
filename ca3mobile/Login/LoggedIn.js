import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import {
    StackNavigator,
  } from 'react-navigation';
import facade from '../LoginFacade';

export default class LoggedIn extends Component {
    constructor(props) {
      super(props);
      this.state= {
      dataFromServer: "Fetching!!",
      joke : ""};
    }
  
    async componentDidMount(){
      await facade.fetchData().then(res => this.setState({
        dataFromServer: res
      }));
    }

    getRandomJoke = () => {
      const data = fetch("https://hawkdon.dk/CA3/api/chucknorris").then(res => res.json()).then(res => this.setState({
        joke: res.value.joke
      }))
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>Data Received from server</Text>
          <Text style={{ fontSize: 20 }}>{this.state.dataFromServer}, welcome to our app</Text>
          <Button title="Logout" onPress={this.props.logout} />
          <Button title="Press me!" onPress={this.getRandomJoke}/>
          <Text style={{fontSize: 20}}>{this.state.joke}</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  