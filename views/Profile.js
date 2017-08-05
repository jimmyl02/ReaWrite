import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {  RkButton, RkText } from 'react-native-ui-kitten';

export default class Profile extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  }

  constructor(props){
    super(props);
    this.state = { loggedIn: false, ready: false }
  }

  checkLoggedIn = () => {
    try {
      AsyncStorage.getItem('token')
      .then(token => {
        if (token != null && token.length > 0){
          this.setState({ loggedIn: true });
          this.setState({ ready: true })
        }else{
          this.setState({ loggedIn: false });
          this.setState({ ready: true })
        }
      })
    } catch(err){
      console.error(err);
    }
  }

  componentWillMount(){
    this.checkLoggedIn();
  }

  render() {
    if(this.state.loggedIn == true){
      //Logged in
      return (
        <View style={styles.container}>
          <RkText>Hi</RkText>
        </View>
      );
    }else{
      //Not logged in
      return (
          <View style={styles.notLoginWrapper}>
            <RkText>You are not currently logged in</RkText>
            <RkButton 
              style={{ marginTop: 4.5 }} 
              onPress={() => this.props.navigation.navigate('Login', {navigation: this.props.navigation})}>
                Login
            </RkButton>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  notLoginWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});