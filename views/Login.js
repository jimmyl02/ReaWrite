import React from 'react';
import { StyleSheet, View, AsyncStorage, Button, ActivityIndicator } from 'react-native';
import {  RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';
import md5 from 'react-native-md5';


export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props){
    super(props);
    this.state = { userId: '', username:'', password: '', errDisplayText: '', errVisible: false, successDisplayText: '', successVisible: false, ready: false }
  }

  componentWillMount(){
    this.checkLoggedIn();
  }

  checkLoggedIn = () => {
    try {
      AsyncStorage.getItem('token')
      .then(token => {
        if (token != null && token.length > 0){
          this.props.navigation.navigate("MainNav");
          //console.log("Logged in: ", true)
        }else{
          this.setState({ ready: true })
          //console.log("Logged in:", false)
        }
      })
    } catch(err){
      console.error(err);
    }
  }

  checkFields = () => {
    if(this.state.username.length > 0 && this.state.password.length > 0){
      this.setState({ errVisible: false });
      this.submit(this.state.username, this.state.password);
    }else{
      this.setState({ errDisplayText: 'All fields must be filled out', errVisible: true })
    }
  }

  submit = (username, password) => {
    this.setState({ errVisible: false, successVisible: false })
    const hex_md5v = md5.hex_md5(password)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: String(username),
        password: String(hex_md5v),
      })
    }
    //console.log("Hashed", hex_md5v);
    fetch('http://104.236.138.179/api/v1/users/auth', options)
    .then(response => {
      if(response.status != 200){              
        this.setState({ errDisplayText: 'The username does not match the password', errVisible: true })
      }else{
        response.json()
        .then(response => {
          this.setAndFinish(response.token, username);
        })
      }
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  getUserId = async (username) => {
    await fetch("http://104.236.138.179/api/v1/users/userId/" + username)
      .then(userIdRes => userIdRes.json())
      .then(userId => AsyncStorage.setItem("userId", userId.userId))
  }

  setAndFinish = async (token, username) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("username", username);
    await this.getUserId(username);
    this.setState({ errVisible: false, successDisplayText: 'You have successfully logged in!', successVisible: true})
    this.props.navigation.navigate("MainNav");
  }

  render() {
    if(this.state.ready == true){
    //const navigation = this.props.navigation.state.params.navigation;
      return (
        <View style={styles.container}>
          <RkText style={{ fontSize: 20 }}>Login</RkText>
          <View style={ this.state.errVisible ? {display: 'unset'} : {display: 'none'}}>
            <RkText style={styles.subtitleError}>{this.state.errDisplayText}</RkText>
          </View>
          <View style={ this.state.successVisible ? {display: 'unset'} : {display: 'none'}}>
            <RkText style={styles.subtitleSuccess}>{this.state.successDisplayText}</RkText>
          </View>
          <RkTextInput
            placeholder='Enter your username'
            autoCapitalize='none'
            autoCorrect={false}
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
            autoCapitalize='none'
            autoCorrect={false}
            multiline={false}
            secureTextEntry={true}
            editable={true}
            onChangeText={(text) => {
              this.setState({ password: text});
              //console.log("onChangeText", "Title");
            }}
            value={this.state.password}
          />
          <RkButton style={{  }} onPress={() => this.checkFields()}>Login</RkButton>
          <View style={ styles.register }>
            <RkText style={{ marginTop: 10 }}>Don't have an account? </RkText><Button onPress={() => this.props.navigation.navigate('Register')} title="register"/>
          </View>
        </View>
      );
    }else{
      return (
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
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
  },
  subtitleSuccess: {
    fontSize: 14,
    marginTop: -2,
    alignSelf: 'center',
    color: '#41F462'
  },
  subtitleError: {
    fontSize: 14,
    marginTop: 4.5,
    alignSelf: 'center',
    color: '#F44242'
  },
});