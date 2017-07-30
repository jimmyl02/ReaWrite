import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  RkButton, RkCard, RkText } from 'react-native-ui-kitten';

export default class ArticleCard extends React.Component {

  render() {
    const { articleId, articleTitle, author, description, navigation } = this.props;
    //l8ter only take in articleId, and call API, then get the other stuff automagically
    return (
      <RkCard style={styles.container}>
        <View rkCardContent style={styles.content}>
          <View style={styles.subHead}>
            <View style={styles.name}>
              <RkText style={styles.title} rkCardTitle>{articleTitle}</RkText>
              <RkText style={styles.subtitle} rkCardSubTitle>By: {author}</RkText>
            </View>
          </View>
          <RkText>{description}</RkText>
        </View>
        <View rkCardFooter style={styles.footer}>
          <RkButton innerStyle={styles.textButton} onPress={() => navigation.navigate("Article", { articleId: articleId } )}>
            VIEW MORE
          </RkButton>
        </View>
      </RkCard>
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