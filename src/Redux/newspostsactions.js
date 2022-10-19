import firestore from '@react-native-firebase/firestore'
import { GETNEWSPOSTS } from './newspostsReducer'



export const getallnews = () => {
  console.log('calling getallnews')
  return dispatch => {

    firestore().collection('newsposts').get()
    .then(snapShot => {
            var rowData = []
            snapShot.docs.map(eachDoc => {
            rowData.push({id: eachDoc.id, ...eachDoc.data() })
            })
            console.log('rowData',rowData)
            dispatch({ type: GETNEWSPOSTS, payload: rowData  })
    }).catch(error => {
          console.log('error',error)
          dispatch({ type: GETNEWSPOSTS, payload: []  })
    })

      //1. you call api
      //2. dispatch your action ..
  }
}
