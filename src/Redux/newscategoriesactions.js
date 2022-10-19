import firestore from '@react-native-firebase/firestore'
import { GETNEWSCATEGORIES, ADDEDCATEGORY, LOADER, ERRORADDEDCATEGORY } from './newscategoriesReducer'

export const getcategories = () => {
  return dispatch => {
    firestore()
      .collection('newscategories')
      .get()
      .then(response => {
        var categorylist = [];
        response.docs.map(each => {
          categorylist.push({label: each.data().name, value: each.id, parentID: each.data().parentID });

        });
        dispatch({ type: GETNEWSCATEGORIES, payload: categorylist })
      })
      .catch(error => {
        console.log('error', error);
        dispatch({ type: GETNEWSCATEGORIES, payload: [] })
      });

  }

};


export const addcategory =   (data) => {
  console.log('add category data come here',data)
  return async dispatch => {
  try {
        var res = await firestore().collection('newscategories').add(data)
        console.log('res',res.id)
        dispatch({ type: ADDEDCATEGORY, payload: {msg: 'category added successfully', data: {label: data.name, value: res.id, parentID: data.parentID } }   })
  }
  catch(error) {
      dispatch({ type: ERRORADDEDCATEGORY, payload: 'network error' })
  }


  }
}

export const loaderStatus =  (data) => {
  return dispatch => {
    dispatch({ type: LOADER, payload: data})
  }
}
