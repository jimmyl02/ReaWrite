import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import Search from 'react-native-search-box';

  const nonJsonArticleData = {
    "articleId" : "1",
    "userId" : "1",
    "username": "jimmyl02",
    "articleTitle" : "A classical story",
    "description" : "A short classical story written by the MASTER himself",
    "fileURL" : "NO"
  };

  const JSONArticleData = JSON.stringify(nonJsonArticleData);

  const nonJsonUserData = {
    "firstName": "Jimmy",
    "lastName": "Li",
    "email": "jimmyli2002@gmail.com",
    "username": "jimmyl02",
    "userId": "1"
  };

  const JSONUserData = JSON.stringify(nonJsonUserData);

export default class Explore extends React.Component {

  static navigationOptions = {
    title: 'Explore',
  }

  constructor(props){
    super(props);
    this.state = { data: [] };
    this.initLoad();
  }

  initLoad = () => {
      fetch('104.236.138.179/api/v1/articles/random').then(article => console.log(article)).then(article => article.json())
        .then(article => {
          //let rows = this.state.data;
          //rows.push(article);
          //this.setState({ data: [article] })
          console.log(article)
        });
  }

  loadMore = () => {
    //Currently using mock, later fetch and parse
    //Need maybe put username along with data so that getting author name will be faster
    for ( let i = 0; i < 2; i++){
      fetch('http://104.236.138.179/api/v1/articles/random').then(article => {
        let rows = this.state.data;
        rows.push(JSON.parse(article));
        this.setState({ data: rows })
      });
    }
  }

  render() {

    return (
      <View style={styles.container}>
            <Search
              ref="search_box"
              /**
              * There many props that can customizable
              * Please scroll down to Props section
              */
            />
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.id}
                renderItem={(item) => <ArticleCard key={item.articleId} articleId={item.articleId} articleTitle={item.articleTitle} author={item.username} description={item.description} navigation={this.props.navigation}/>}
                onEndReached={({ distanceFromEnd }) => {
                  //this.loadMore();
                }}
                onEndThreshold={0.5}
              />
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