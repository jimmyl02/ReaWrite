import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  RkButton, RkCard, RkText } from 'react-native-ui-kitten';

export default class Article extends React.Component {

  static navigationOptions = {
    title: 'View article',
  }

  render() {
    const articleId = this.props.navigation.state.params.articleId;
    //Get article by id from api
    //Using dummy data in this case
    let articleTitle = "Yo this is a short story";
    let author = "jimz";
    let content = "aijfaowpi aperuhgo iaeurbgaierbgiarebgia eurbgiaurbg iaeurbg iaeurbg iaourbg iaerubgoiaurgb aioeurbg iaeurgb iaeurbg oaiergb aeorg uboiaer";
    return (
      <View style={styles.container}>
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <View style={styles.subHead}>
              <View style={styles.name}>
                <RkText style={styles.title} rkCardTitle>{articleTitle}</RkText>
                <RkText style={styles.subtitle} rkCardSubTitle>By: {author}</RkText>
              </View>
            </View>
          </View>
        </RkCard>
        {//Portion #2
        }
        <RkCard style={styles.container}>
          <View rkCardContent style={styles.content}>
            <RkText>{content}</RkText>
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