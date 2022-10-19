/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  SliderBase,
  SafeAreaView,
  Button,
  useWindowDimensions,
  Animated,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useState, useRef, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Drawer,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
//import {logout} from '../Redux/Action/loginAction';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import _ from 'lodash';
const CustomDrawer = (props, route) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //   const [currentUser, set_currentuser] = useState(null);
  //   const chatUser = route.params.chatUser;
  //   useEffect(() => {
  //     const currentUser = auth().currentUser;
  //     set_currentuser(currentUser);
  //     navigation.setOptions(
  //       {
  //         title: `${chatUser.name}`,
  //         image: `${chatUser.image}`,
  //       },
  //       [],
  //     );
  return (
    <View style={styles.container}>
      <View style={{padding: hp('8%'), backgroundColor: '#c2fbb6'}}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <View
            style={{
              position: 'absolute',
              marginLeft: hp('-6%'),
              marginTop: hp('-4%'),
            }}>
            <AntDesign name={'close'} size={22} color={'black'} />
          </View>
          <View
            style={{
              position: 'absolute',
              marginLeft: hp('12%'),
              marginTop: hp('-4%'),
            }}>
            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
              ChatApp
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.username}>
          <Text
            style={{
              color: 'black',
              //paddingTop: hp('2%'),
              fontWeight: '900',
              fontSize: hp('3%'),
              marginLeft: hp('-6%'),
              marginTop: hp('5%'),
              marginBottom: hp('-1%'),
            }}>
            Hello,
            <Text
              style={{
                color: 'black',
                //paddingTop: hp('2%'),
                fontWeight: '900',
                fontSize: hp('3%'),
                marginLeft: hp('-6%'),
                marginTop: hp('5%'),
                marginBottom: hp('-1%'),
              }}>
              {props.name}
            </Text>
          </Text>
          <Text
            style={{
              color: 'black',
              paddingTop: hp('1%'),
              marginLeft: hp('-6%'),
              marginBottom: hp('-1%'),
              //fontWeight: '900',
              //fontSize: hp('1.8%'),
            }}>
            Welcome back
          </Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: 'white',
          // borderWidth: 1,
          //borderColor: 'black',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          //marginBottom: hp('25%')
          //paddingBottom: hp('15%'),
        }}>
        <DrawerItemList {...props} />
        <View style={{flexDirection: 'row', marginBottom: hp('2%')}}>
          <Image
            style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
            source={require('../../../assets/logout.png')}
          />
          <TouchableOpacity onPress={() => auth().signOut()}>
            <Text
              style={{
                marginLeft: hp('4%'),
                marginTop: hp('2%'),
                color: '#4B4F54',
                fontWeight: '900',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.support}>
            <Text
              style={{
                marginTop: hp('1.8%'),
                marginLeft: hp('2%'),
                fontWeight: '900',
                color: 'black',
              }}>
              Support
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: hp('1%')}}>
            <Image
              style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
              source={require('../../../assets/Agreement.png')}
            />
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: hp('4%'),
                  marginTop: hp('2%'),
                  color: '#4B4F54',
                  fontWeight: '900',
                }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: hp('1%')}}>
            <Image
              style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
              source={require('../../../assets/privacy.png')}
            />
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: hp('4%'),
                  marginTop: hp('2%'),
                  color: '#4B4F54',
                  fontWeight: '900',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: hp('1%')}}>
            <Image
              style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
              source={require('../../../assets/contact.png')}
            />
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: hp('4%'),
                  marginTop: hp('2%'),
                  color: '#4B4F54',
                  fontWeight: '900',
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.support}>
          <Text
            style={{
              marginBottom: hp('-1%'),
              marginLeft: hp('2%'),
              fontWeight: '900',
              color: 'black',
            }}>
            Support
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: hp('2%')}}>
          <Image
            style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
            source={require('../../../assets/Agreement.png')}
          />
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: hp('4%'),
                marginTop: hp('2%'),
                color: '#4B4F54',
                fontWeight: '900',
              }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginBottom: hp('2%')}}>
          <Image
            style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
            source={require('../../../assets/privacy.png')}
          />
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: hp('4%'),
                marginTop: hp('2%'),
                color: '#4B4F54',
                fontWeight: '900',
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginBottom: hp('2%')}}>
          <Image
            style={{marginLeft: hp('2.4%'), marginTop: hp('2%')}}
            source={require('../../../assets/contact.png')}
          />
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: hp('4%'),
                marginTop: hp('2%'),
                color: '#4B4F54',
                fontWeight: '900',
              }}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2fbb6',
  },
  username: {
    //marginBottom: 10
  },
  support: {
    width: wp('100%'),
    height: hp('12%'),
    //marginBottom: hp('5%'),
    backgroundColor: '#F4F4F6',
    // borderTopWidth: 1,
    // borderTopColor: 'red',
    //marginLeft: hp('1%'),
    //borderRadius: 8,
  },
});
export default CustomDrawer;
