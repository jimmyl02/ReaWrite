import React from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator, FlatList, ScrollView, RefreshControl } from 'react-native';
import {  RkCard, RkButton, RkText } from 'react-native-ui-kitten';
import ArticleCard from '../components/ArticleCard';

export default class Profile extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  }

  constructor(props){
    super(props);
    this.state = { ready: false, username: '', userId: '', data: [], hasArticles: false, refreshing: false }
  }

  componentWillMount() {
    this.initLoad().then(this.setState({ ready: true }))
  }

  initLoad = async () => {
    const username = await AsyncStorage.getItem("username");
    const userId = await AsyncStorage.getItem("userId");
    await this.getData(userId);
    await this.setState({ username: username, userId: userId });
  }

  getData = async (userId) => {
    await fetch('http://104.236.138.179/api/v1/users/articles/' + userId)
      .then(data => data.json())
      .then(data => {
        if(data != null && data.length > 0){
          //Has articles
          //console.log("Data - profile - hasData", data)
          this.setState({ data: data });
          this.setState({ hasArticles: true })
        }else{
          //User hasn't uploaded any articles
          //console.log("Data", "noArticles");
          this.setState({ hasArticles: false })
        }
      })
  }

  logout = () => {
    AsyncStorage.removeItem("username");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    this.props.navigation.navigate("Login");
  }

  refresh = () => {
    this.setState({ refreshing: true });
    this.getData(this.state.userId).then(() => {
      this.setState({ refreshing: false })
    })
  }

  render() {
    if(this.state.ready == false){
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }else{
      if(this.state.hasArticles == true){
        //There are articles
        return (
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh.bind(this)}
            />
          }>
          <View>
            <RkCard style={styles.container}>
              <View rkCardContent style={styles.content}>
                <View style={styles.subHead}>
                  <View style={styles.name}>
                    <RkText style={styles.title} rkCardTitle>{this.state.username}</RkText>
                    <RkButton innerStyle={styles.textButton} onPress={() => this.logout() } >
                      LOG OUT
                    </RkButton>
                  </View>
                </View>
              </View>
            </RkCard>
            <RkCard style={styles.container}>
              <View rkCardContent style={styles.content}>
                <View style={styles.subHead}>
                  <View style={styles.name}>
                    <RkText style={styles.title} rkCardTitle>
                      Articles
                    </RkText>
                  </View>
                </View>
              </View>
            </RkCard>
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
            />
          </View>
          </ScrollView>
          );
      }else{
        //There are no articles
        return (
          <View>
            <RkCard style={styles.container}>
              <View rkCardContent style={styles.content}>
                <View style={styles.subHead}>
                  <View style={styles.name}>
                    <View style={styles.column}>
                      <RkText style={styles.title} rkCardTitle>{this.state.username}</RkText>
                      <RkButton innerStyle={styles.textButton} onPress={() => this.logout() } >
                        LOG OUT
                      </RkButton>
                    </View>
                  </View>
                </View>
              </View>
            </RkCard>
            <RkCard style={styles.container}>
              <View rkCardContent style={styles.content}>
                <View style={styles.subHead}>
                  <View style={styles.name}>
                    <RkText style={styles.title} rkCardTitle>
                      Articles
                    </RkText>
                  </View>
                </View>
              </View>
            </RkCard>
            <RkCard style={styles.container}>
              <View rkCardContent style={styles.content}>
                <View style={styles.subHeadInformation}>
                  <RkText style={styles.subtitle} > No articles have been posted by you! </RkText>
                  <RkText style={styles.subtitle} > Go to upload and post your first article! </RkText>
                </View>
              </View>
            </RkCard>
          </View>
        );
      }
    }
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
  subHeadInformation: {
    flexDirection: 'column',
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
  },
  column: {
    flex: 1,
    flexDirection: 'column'
  }
});