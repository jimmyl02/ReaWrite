import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import Search from 'react-native-search-box';

/*
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
*/

export default class Explore extends React.Component {

  static navigationOptions = {
    title: 'Explore',
  }

  constructor(props){
    super(props);
    this.state = { data: [], ready: false };
    this.initLoad();
  }

  initLoad = () => {
    //console.log("call", "initLoad");
    fetch('http://104.236.138.179/api/v1/articles/random')
      .then(article => article.json())
      .then(article => {
        //console.log("article", article);
        return article;
      })
      .then(article => {
        let tmp = [];
        tmp.push(article)
        //console.log("tmpLog", tmp)
        this.setState({ data: tmp });
        //console.log("data", this.state.data);
        this.setState({ ready: true })
      })
      .catch(console.error)
  }

  loadMore = () => {
    //Currently using mock, later fetch and parse
    //Need maybe put username along with data so that getting author name will be faster
    for ( let i = 0; i < 2; i++){
      //console.log("call", "loadMore");
      /*
      fetch('http://104.236.138.179/api/v1/articles/random').then(article => {
        let rows = this.state.data;
        rows.push(JSON.parse(article));
        this.setState({ data: rows })
      })
        .catch(console.error);
        */
    fetch('http://104.236.138.179/api/v1/articles/random')
      .then(article => article.json())
      .then(article => {
        let tmp = this.state.data;
        tmp.push(article)
        this.setState({ data: tmp });
        //console.log("data", this.state.data);
      })
      .catch(console.error)
    }
  }

  render() {

    if(this.state.ready == false) {
      return (
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
              <Search
                ref="search_box"
              />
                <FlatList
                  data={this.state.data}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => 
                    <ArticleCard 
                      articleId={item.articleId} 
                      articleTitle={item.title} 
                      author={item.userId} 
                      description={item.description} 
                      navigation={this.props.navigation}
                    />
                  }
                  onEndReached={({ distanceFromEnd }) => {
                    this.loadMore();
                  }}
                  onEndThreshold={0.5}
                />
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
});