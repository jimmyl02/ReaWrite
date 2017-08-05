import React from 'react';
import { StyleSheet, View, AsyncStorage, Button } from 'react-native';
import {  RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';
import { sha256 } from 'react-native-sha256';

export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props){
    super(props);
    this.state = { username:'', password: '', ready: false }
  }

  submit = () => {
    sha256(this.state.password).then(shaPass => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //Tmp until login system
          username: String(this.state.username),
          password: String(shaPass),
        })
      }
      fetch('http://104.236.138.179/api/v1/users/auth', options)
      .then(response => response.json())
      .then(response => {
        //Check response status
        AsyncStorage.setItem("token", response.token)
      })
      .catch(function (err) {
        console.error(err);
      });
    })
  }

  render() {
    const navigation = this.props.navigation.state.params.navigation;
    return (
      <View style={styles.container}>
        <RkText style={{ fontSize: 20 }}>Login</RkText>
        <RkTextInput
          placeholder='Enter your username'
          multiline={false}
          editable={true}
          maxLength={30}
          onChangeText={(text) => {
            this.setState({ username: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.username}
        />
        <RkTextInput
          placeholder='Enter your password'
          multiline={false}
          secureTextEntry={true}
          editable={true}
          onChangeText={(text) => {
            this.setState({ password: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.password}
        />
        <RkButton style={{  }} onPress={() => this.submit}>Login</RkButton>
        <View style={ styles.register }>
          <RkText style={{ marginTop: 10 }}>Don't have an account? </RkText><Button onPress={() => navigation.navigate('Register')} title="register"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});