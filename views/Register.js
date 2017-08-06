import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import {  RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';
import md5 from 'react-native-md5';

export default class Register extends React.Component {

  static navigationOptions = {
    title: 'Register',
  }

  constructor(props){
  	super(props);
  	this.state = { 
	  	firstName: '', 
	  	lastName: '', 
	  	email:'', 
  		username: '', 
	  	password: '', 
	  	passwordConf: '',
	  	errMessage: '', 
	  	displayError: false, 
	  	successMessage: '',
	  	displaySuccess: false,
	  	ready: false,
	  	creating: false
  	}
  }

  checkFields = () => {
  	this.setState({ displayError: false, displaySuccess: false })
  	const { firstName, lastName, email, username, password, passwordConf } = this.state;
  	if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && username.length > 0 && password.length > 0 && passwordConf.length > 0){
  		//All fields are filled out
  		if(password == passwordConf){
  			//Passwords match
  			this.setState({ ready: false, creating: true })
  			this.submitNewAccount(firstName, lastName, email, username, password);
  		}else{
  			this.setState({ errMessage: 'Your passwords do not match', displayError: true })
  		}
  	}else{
  		this.setState({ errMessage: 'All fields must be filled out', displayError: true });
  	}
  }

  checkIfUsernameExist = () => {
  	console.log("TODO")
  }

  submitNewAccount = (firstName, lastName, email, username, password) => {
    const hex_md5v = md5.hex_md5(password);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      	firstName: firstName,
      	lastName: lastName,
      	email: email,
        username: username,
        password: hex_md5v,
      })
    }
  	fetch('http://104.236.138.179/api/v1/users/create', options)
  	.then(response => {
  		if(response.status != 200){
  			//Problem child
  			this.setState({ errMessage: 'There was an issue creating the account, please contant administrator', displayError: true })
  		}else{
  			this.setState({ creating: false, ready: true, successMessage: 'Your account has been created! Return to login to login', displaySuccess:true });
  		}
  	})
  }

  render(){
    return (
    	<ScrollView>
      <View style={styles.container}>
        <RkText style={{ fontSize: 20, marginTop: 10 }}>Register</RkText>
        <RkTextInput
          placeholder='Enter your first name'
          autoCapitalize='none'
          autoCorrect={false}
          multiline={false}
          editable={true}
          onChangeText={(text) => {
            this.setState({ firstName: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.firstName}
        />
        <RkTextInput
          placeholder='Enter your last name'
          autoCapitalize='none'
          autoCorrect={false}
          multiline={false}
          editable={true}
          onChangeText={(text) => {
            this.setState({ lastName: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.lastName}
        />
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
          placeholder='Enter your email'
          autoCapitalize='none'
          autoCorrect={false}
          multiline={false}
          editable={true}
          onChangeText={(text) => {
            this.setState({ email: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.email}
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
        <RkTextInput
          placeholder='Confirm your password'
          autoCapitalize='none'
          autoCorrect={false}
          multiline={false}
          secureTextEntry={true}
          editable={true}
          onChangeText={(text) => {
            this.setState({ passwordConf: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.passwordConf}
        />
        <View style={ this.state.displayError ? {display: 'unset'} : {display: 'none'}}>
          <RkText style={styles.subtitleError}>{this.state.errMessage}</RkText>
        </View>
        <View style={ this.state.displaySuccess ? {display: 'unset'} : {display: 'none'}}>
          <RkText style={styles.subtitleSuccess}>{this.state.successMessage}</RkText>
        </View>
        <View style={ this.state.creating ? {display: 'unset'} : {display: 'none'}}>
          <View style={{alignItems: 'center', marginBottom: 4.5}}>
            <ActivityIndicator />
          </View>
        </View>
        <RkButton style={{ marginBottom: 4.5 }} onPress={() => this.checkFields()}>Register</RkButton>
      </View>
      </ScrollView>
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
    marginBottom: 4.5,
    alignSelf: 'center',
    color: '#F44242'
  },
});