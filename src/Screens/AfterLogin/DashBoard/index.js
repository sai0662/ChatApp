/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
//import {getallnews} from './store/newspostsactions';

import {useSelector, useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
const DashBoard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [usersList, set_usersList] = useState([]);
  const [usersListbackup, set_usersListbackup] = useState([]);

  useEffect(() => {
    var user = auth().currentUser;
    console.log('user.uid', user.uid);

    database()
      .ref('/users')
      .once('value')
      .then(snapshot => {
        //console.log('User data: ', snapshot.val());
        var dataArray = [];
        let data = snapshot.val();

        _.map(data, (each, index) => {
          //console.log('each',each,'index',index)
          if (index !== user.uid) {
            dataArray.push({id: index, ...each});
          }
        });
        console.log('dataArray', dataArray);
        dataArray = _.orderBy(dataArray, ['timecreated'], ['asc']);
        set_usersList(dataArray);
        set_usersListbackup(dataArray);
      });

    // {pzSEp3Z4oOTmRKBcjbaHq4h1rXv1: {…}, duFS79f7qbdADaskVeu23O6B3wJ2: {…}, Q1wRBPh127QDuwrMWrgKZnHLapM2: {…}, nY5E3snC0pXLFRweBQmOi0FQCxS2: {…}, GiQoNy2sfiPtB0PfN1kMomOOS2O2: {…}}
    //
    // [{name: ...}, {}]
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('chat', {chatUser: item})}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          height: 80,
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 50,
              height: 50,
              //borderWidth: 1,
              paddingLeft: 20,
              borderRadius: 40,
              marginLeft: 10,
            }}>
            {/* <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 40,
                marginLeft: -20,
              }}
              source={require('../../../../assets/pro.png')}
            /> */}
            <Image
              source={{uri: item.image}}
              style={{
                width: 50,
                height: 50,
                borderRadius: 40,
                marginLeft: -20,
              }}
            />
          </View>
          <View>
            <Text style={{paddingLeft: 20, color: 'black', marginTop: 16}}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [search, setSearch] = useState([]);
  const searchuser = val => {
    setSearch(val);
    set_usersList(usersListbackup.filter(item => item.name.match(val)));
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{marginTop: 13, width: 44, height: 44, marginLeft: 10}}>
          <Entypo name={'menu'} size={35} color={'#0be99b'} />
        </TouchableOpacity>
        <View style={{marginTop: 12}}>
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              fontWeight: 'normal',
              marginLeft: 10,
            }}>
            Chats
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 16,
        }}>
        <View style={{width: '80%', borderRadius: 10}}>
          <TextInput
            onChangeText={val => searchuser(val)}
            value={String(search)}
            placeholder={'Search'}
            style={{
              color: 'black',
              height: 40,
              paddingHorizontal: 8,
              backgroundColor: '#eef7fa',
              borderColor: '#73d3b7',
              borderRadius: 18,
            }}
          />
        </View>
      </View>
      <FlatList
        data={usersList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    // <Button onPress={() => auth().signOut()} title="sign out" />
  );
};

export default DashBoard;
