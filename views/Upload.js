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
    this.state = { title: '', description: '', content: '', retArticleId: '', visibleError: false, visibleSuccess: false }
  }

  check = () => {
    this.setState({ visibleSuccess: false, visibleError: false })
    if(this.state.title.length > 0 && this.state.description.length > 0 && this.state.content.length > 0){
      this.setState({ visibleSuccess: true });
      this.upload();
    }else{
      this.setState({ visibleError: true });
    }
  }

  upload = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //Tmp until login system
        userId: String(1),
        title: String(this.state.title),
        description: String(this.state.description),
        fileURL: String(this.state.content)
      })
    }
    fetch('http://104.236.138.179/api/v1/articles/create', options)
    .then(article => article.json())
    .then(article => {
      this.setState({ retArticleId: article.articleId })
    })
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
              <RkText style={styles.subtitle} rkCardSubTitle>Title (30 characters)</RkText>
            </View>
          </View>
        </RkCard>
        <RkTextInput
          placeholder='Enter your title here'
          multiline={true}
          editable={true}
          maxLength={30}
          onChangeText={(text) => {
            this.setState({ title: text});
            //console.log("onChangeText", "Title");
          }}
          value={this.state.title}
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
        <View style={ this.state.visibleError ? {display: 'unset'} : {display: 'none'}}>
          <RkCard style={styles.container}>
            <View rkCardContent style={styles.content}>
              <View style={styles.subHead}>
                <RkText style={styles.subtitleError}>Error! Make sure all fields are filled out!</RkText>
              </View>
            </View>
          </RkCard>
        </View>
        <View style={ this.state.visibleSuccess ? {display: 'unset'} : {display: 'none'}}>
          <RkCard style={styles.container}>
            <View rkCardContent style={styles.content}>
              <View style={styles.subHead}>
                <RkText style={styles.subtitleSuccess}>
                  Success! Your article has now been uploaded
                  Your article's ID is: {this.state.retArticleId}
                </RkText>
              </View>
            </View>
          </RkCard>
        </View>
      </View>
      <RkButton 
        style={{ flex:1, flexDirection:'row', alignSelf:'center', marginBottom: 10, marginTop: 5 }} 
        onPress={() => 
          this.check()
        }>
        Upload!
      </RkButton>
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
  subtitleError: {
    fontSize: 14,
    marginTop: -2,
    alignSelf: 'center',
    color: '#F44242'
  },
  subtitleSuccess: {
    fontSize: 14,
    marginTop: -2,
    alignSelf: 'center',
    color: '#41F462'
  },
  textButton: {
    color: '#009688'
  },
  text: {
    fontSize: 18,
    color: '#A9A9A9'
  }
});