import React from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Perjalanan from './screens/Perjalanan';
import Seat from './screens/Seat';
import Pesan from './screens/Pesan';
import Lokasi from './screens/Lokasi'
import Profile from './screens/Profile';
import Riwayat from './screens/Riwayat';
import Tentang from './screens/Tentang';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';
import LocationTest from './screens/LocationTest'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

AsyncStorage.getItem('access_token').then(val=>{
  axios.defaults.headers.common['Authorization'] = 'Bearer '+val;
})

export default class App extends React.Component {

  render() {
    return(
      <AppContainer />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home: Home,
  Perjalanan: Perjalanan,
  Seat: Seat,
  Pesan: Pesan,
})

const ProfileStack = createStackNavigator({
  Profile: Profile,
  Tentang: Tentang
})

const RiwayatStack = createStackNavigator({
  Riwayat: Riwayat
})

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  }
})
const WebStack = createStackNavigator({
  LocationTest: {
    screen: LocationTest,
    navigationOptions: {
      title: 'Pembayaran',
      headerStyle:{
        backgroundColor: '#5cb85c'
    },
    headerTintColor: '#fff'
    }
  }
})

const bottomNavigator = createBottomTabNavigator({
  Home: AppStackNavigator,
  Riwayat: RiwayatStack,
  Profile: ProfileStack
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ({focused, tintColor})=>{
      const { routeName } = navigation.state;
      let iconName;
      if(routeName == 'Home'){
        iconName = `ios-home`;
      }else if(routeName == 'Riwayat'){
      iconName = `ios-list${focused?'-box':''}`;
    }else if(routeName == 'Profile'){
      iconName = `ios-contact`
    }
    return <Ionicons name={iconName} size={25} color={tintColor} />
    },
  }),
  tabBarOptions:{
    activeTintColor: '#5cb85c',
    inactiveTintColor: 'grey'
  },
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    bottomNavigator: bottomNavigator,
    AuthStack: AuthStack,
    WebStack: WebStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));