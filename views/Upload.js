import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
//import { RichTextEditor } from 'react-native-zss-rich-text-editor';
import {  RkButton, RkCard, RkText, RkTextInput } from 'react-native-ui-kitten';

export default class Upload extends React.Component {

  static navigationOptions = {
    title: 'Upload',
  }

  constructor(props){
    super(props);
    this.state = { title: '', description: '', content: '' }
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <View style={styles.name}>
                <RkText style={styles.title} rkCardTitle>Upload your article</RkText>
              </View>
            </View>
          </View>
        </RkCard>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <RkText style={styles.subtitle} rkCardSubTitle>Title (25 characters)</RkText>
            </View>
          </View>
        </RkCard>
        <RkTextInput
          placeholder='Enter your title here'
          multiline={true}
          editable={true}
          maxLength={25}
          onChangeText={(text) => {
            this.setState({ title: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.description}
        />        
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <RkText style={styles.subtitle} rkCardSubTitle>Description (250 characters)</RkText>
            </View>
          </View>
        </RkCard>
        <RkTextInput
          inputStyle={{ height: 100 }}
          placeholder='Enter your description here'
          multiline={true}
          editable={true}
          maxLength={250}
          onChangeText={(text) => {
            this.setState({ description: text});
            //console.log("onChangeText", "Description");
          }}
          value={this.state.description}
        />
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <RkText style={styles.subtitle} rkCardSubTitle>Article (2500 characters)</RkText>
            </View>
          </View>
        </RkCard>
        <RkTextInput
          inputStyle={{ height: 150 }}
          placeholder='Enter your article here'
          multiline={true}
          editable={true}
          maxLength={2500}
          onChangeText={(text) => {
            this.setState({ content: text});
            //console.log("onChangeText", "Article");
          }}
          value={this.state.content}
        />
      <RkButton style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>Upload!</RkButton>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 4.5,
    marginRight: 4.5,
    marginTop: 4.5
  },
  subHead: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    marginBottom: 10
  },
  content: {
    backgroundColor: 'transparent',
    zIndex: 80
  },
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  title: {
    color: '#A9A9A9',
    fontSize: 24
  },
  subtitle: {
    fontSize: 14,
    marginTop: -2,
    color: '#808080'
  },
  textButton: {
    color: '#009688'
  },
  text: {
    fontSize: 18,
    color: '#A9A9A9'
  }
});