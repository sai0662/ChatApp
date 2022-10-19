/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashBoard from '../Screens/AfterLogin/DashBoard/index';
import Login from '../Screens/BeforeLogin/Login/index';
import Register from '../Screens/BeforeLogin/Register/index';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import {Provider} from 'react-redux';
import store from '../Redux/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Chat from '../Screens/AfterLogin/Chat';
import CustomDrawer from '../Components/CustomeDrawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#F4F4F6',
        drawerActiveTintColor: 'black',
        drawerStyle: {
          width: '100%',
        },
        drawerLabelStyle: {
          fontWeight: '900',
        },
      }}>
      <Drawer.Screen
        name="home"
        options={{headerShown: false}}
        component={DashBoard}
      />
    </Drawer.Navigator>
  );
};
function Navigator(props, route) {
  const [state, setstate] = useState({loading: true, currentUser: null});

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        var uid = user.uid;
        //console.log('uid onAuthStateChanged',uid)
        setstate(prev => ({...prev, currentUser: uid, loading: false}));
        getToken();
      } else {
        //console.log('user is signout')
        setstate(prev => ({...prev, currentUser: null, loading: false}));
      }
    });

    getRequest(); // permissions

    // when you app will be in the foreground
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // if(remoteMessage.data.url === 'google'){
      //
      // }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  const getRequest = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      //console.log('Authorization status:', authStatus);
      getToken();
    }
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        //console.log('token for notifications',token)
        if (auth().currentUser !== null) {
          //firestore().collection('users').doc(auth().currentUser.uid).update({ token: token })
          database()
            .ref(`/users/${auth().currentUser.uid}`)
            .update({token})
            .then(() => {
              console.log('token is saved');
            })
            .catch(error => {
              console.log('token not saved');
            });
        }
      })
      .catch(error => {
        //console.log('erro to get a token',error)
      });
    //taxi > employees, drivers , customers // all
    messaging()
      .subscribeToTopic('customers')
      .then(() => {
        //console.log('subscribeed to topic customers')
      });
  };

  const loginPage = () => {
    const currentUser = auth().currentUser;
    //console.log('currentUser on router page',currentUser)
    setstate(prev => ({...prev, currentUser, loading: false}));
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.currentUser === null ? (
            <>
              <Stack.Screen
                name="login"
                options={{headerShown: false}}
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="register"
                component={Register}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="mydrawer"
                options={{headerShown: false}}
                component={MyDrawer}
              />
              <Stack.Screen
                name="chat"
                options={{headerShown: true}}
                component={Chat}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigator;
