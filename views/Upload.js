import React from 'react';
import { StyleSheet, View } from 'react-native';
//import { RichTextEditor } from 'react-native-zss-rich-text-editor';

export default class Upload extends React.Component {

  static navigationOptions = {
    title: 'Upload',
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