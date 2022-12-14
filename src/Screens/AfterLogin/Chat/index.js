/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native';

import database from '@react-native-firebase/database';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import Moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

const Chat = ({navigation, route}) => {
  //console.log('routes',, navigation)

  const chatUser = route.params.chatUser;

  const dispatch = useDispatch();
  const [chatlist, set_chatlist] = useState([]);
  const [chatmsg, set_chatmsg] = useState('');
  const [currentUser, set_currentuser] = useState(null);

  useEffect(() => {
    //console.log('currentuser',currentuser)
  }, [currentUser]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    set_currentuser(currentUser);
    navigation.setOptions({
      title: `${chatUser.name}`,
      image: `${chatUser.image}`,
    });

    database()
      .ref(`users/${currentUser.uid}/chat/${chatUser.id}`)
      .on('value', snapshot => {
        //console.log('chat data: ', snapshot.val());
        var dataArray = [];
        var pendingtoReadStatus = [];
        let data = snapshot.val();
        _.map(data, (each, index) => {
          console.log('each', each, 'index', index);
          dataArray.push({id: index, ...each});
          if (
            each.receiver_id === currentUser.uid &&
            each.receiver_read === false
          ) {
            pendingtoReadStatus[index];
          }
        });
        dataArray = _.orderBy(dataArray, ['timecreated'], ['asc']);
        set_chatlist(dataArray);
        //pendingtoReadStatus.
      });
  }, []);

  const renderItem = ({item}) => {
    console.log('item', item);
    return (
      <View
        style={{
          marginVertical: 10,
          alignItems:
            item.sender_id === currentUser.uid ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            borderRadius: 26,
            backgroundColor:
              item.sender_id === currentUser.uid ? '#c2fbb6' : 'white',
            minHeight: 60,
            paddingHorizontal: 15,
            justifyContent: 'center',
            width: width * 0.7,
          }}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
            {item.content}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontWeight: '400',
              marginTop: 5,
            }}>
            {item.timecreatedHuman}
          </Text>
        </View>
      </View>
    );
  };

  const submitForm = () => {
    var t = Moment().valueOf();
    const msgContent = {
      content: chatmsg,
      sender_id: currentUser.uid,
      receiver_id: chatUser.id,
      timecreated: t,
      timecreatedHuman: Moment().format('DD-MM-YYYY HH:mm:ss a'),
      status: true,
      sender_read: true,
      receiver_read: false,
    };
    database()
      .ref(`users/${currentUser.uid}/chat/${chatUser.id}/${t}`)
      .update(msgContent);
    database()
      .ref(`users/${chatUser.id}/chat/${currentUser.uid}/${t}`)
      .update(msgContent);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e5e5e5'}}>
      <View style={{paddingHorizontal: 6}}>
        {chatlist.length === 0 ? (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'grey', fontSize: 10}}>no message</Text>
          </View>
        ) : (
          <FlatList
            data={chatlist}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      {/* msg sending component */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width,
          height: 70,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
          backgroundColor: '#a8e4d2',
        }}>
        <View style={{flex: 1}} />
        <View style={{flex: 3.6}}>
          <TextInput
            value={chatmsg}
            onBlur={() => Keyboard.dismiss()}
            onChangeText={set_chatmsg}
            maxLength={200}
            multiline
            numberOfLines={2}
            style={{
              color: 'black',
              height: 50,
              paddingHorizontal: 8,
              paddingVertical: 2,
              width: width * 0.6,
              backgroundColor: 'white',
              borderColor: '#73d3b7',
              borderRadius: 18,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: '#307863',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={String(chatmsg).length < 1}
            onPress={submitForm}>
            <Ionicons name={'ios-send'} size={22} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
