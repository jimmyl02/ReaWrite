import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {  RkButton, RkCard, RkText } from 'react-native-ui-kitten';

export default class Article extends React.Component {

  static navigationOptions = {
    title: 'View article',
  }

  constructor(props){
    super(props);
    this.state = { username: '', articleTitle: '', content: '', ready: false };
  }

  componentWillMount(){
    const username = this.props.navigation.state.params.username;
    this.setState({ username: username });
    const articleTitle = this.props.navigation.state.params.articleTitle;
    this.setState({ articleTitle: articleTitle });
    const articleId = this.props.navigation.state.params.articleId;
    this.getArticleContent(articleId);
  }

  getArticleContent = (articleId) => {
    fetch('http://104.236.138.179/api/v1/articles/content/' + articleId)
    .then(article => article.json())
    .then(article => {
      this.setState({ content: article.content })
      this.setState({ ready: true })
    })
  }

  render() {
    //Get article by id from api
    //Using dummy data in this case
    //let content = "aijfaowpi aperuhgo iaeurbgaierbgiarebgia eurbgiaurbg iaeurbg iaeurbg iaourbg iaerubgoiaurgb aioeurbg iaeurgb iaeurbg oaiergb aeorg uboiaer";
    return (
      <View style={styles.container}>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <View style={styles.name}>
                <RkText style={styles.title} rkCardTitle>{this.state.articleTitle}</RkText>
                <RkText style={styles.subtitle} rkCardSubTitle>By: {this.state.username}</RkText>
              </View>
            </View>
          </View>
        </RkCard>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            {this.state.ready ? <RkText>{this.state.content}</RkText> : <ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} /> }
          </View>
        </RkCard>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <View style={styles.name}>
                <RkText style={styles.title} rkCardTitle>Comments</RkText>
              </View>
            </View>
          </View>
        </RkCard>
      </View>
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