import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ArticleCard from '../components/ArticleCard';

export default class Feed extends React.Component {

  static navigationOptions = {
    title: 'Feed',
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ArticleCard articleId="1" articleTitle="A short story" author="Jimmyl02" description="A dumb short story which I need help with; I'm trying to improve my writing skills right now" navigation={this.props.navigation} />
          <ArticleCard articleId="1" articleTitle="A sonnet" author="The_Real_Shakespere" description="A masterpiece written by The_God himself" navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});