import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Notifications extends React.Component {

  static navigationOptions = {
    title: 'Notifications',
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});