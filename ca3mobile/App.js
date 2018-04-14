import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      joke : ""
    }
  }

  getRandomJoke = () => {
    const data = fetch("https://hawkdon.dk/CA3/api/chucknorris").then(res => res.json()).then(res => this.setState({
      joke: res.value.joke
    }))
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 20}}>Press on the button to get a ChuckNorris joke</Text>
      <Button onPress={this.getRandomJoke} title="Press me!"/>
      <Text style={{fontSize: 20}}>{this.state.joke}</Text>
      </View>
    );
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
