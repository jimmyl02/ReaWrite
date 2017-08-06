import React from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
//Ionicons icons import
//Import views
import Feed from './views/Feed';
import Article from './views/Article';
import Explore from './views/Explore';
import Upload from './views/Upload';
import Notifications from './views/Notifications';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Login from './views/Login';
import Register from './views/Register'

/*
NOT PART OF MVP
const StackFeed = StackNavigator({
  Home: { screen: Feed },
  Article: { screen: Article},
});
*/

const StackExplore = StackNavigator({
  Explore: { screen: Explore },
  Article: { screen: Article }
});

const StackUpload = StackNavigator({
  Upload: { screen: Upload },
});

/*
NOT PART OF MVP
const StackNotifications = StackNavigator({
  Notifications: { screen: Notifications }
});
*/

const StackProfile = StackNavigator({
  Profile: { screen: Profile },
  Login: { screen: Login },
  Register: { screen: Register }
});

const TabRoutes = TabNavigator({
  //StackFeed: { screen: StackFeed },
  StackExplore: { screen: StackExplore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-book" size={35} color={tintColor} />
    },
  },
  StackUpload: { screen: StackUpload,
    navigationOptions: {
      tabBarLabel: 'Upload',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-cloud-upload" size={35} color={tintColor} />
    },
  },
  //StackNotifications: { screen: StackNotifications },
  StackProfile: { screen: StackProfile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-person" size={35} color={tintColor} />
    },
  }
});

export default TabRoutes;