export const GETNEWSCATEGORIES = 'getnewscategories'
export const ADDEDCATEGORY = 'addedcategory' // this i use , when a new category added
export const LOADER = 'loader'
export const ERRORADDEDCATEGORY = 'erroraddedcategory'
// const ADDNEWSPOST = 'addnewspost'
// const EDITNEWSPOST = 'editnewspost'
// const DELETENEWSPOST = 'deletenewspost'

const initValue = {
  newscategories: [],
  loading: false,
  msg: null
}


const newscategoriesReducer = (state = initValue , action) => {
  console.log('action',action)
  if(action.type === GETNEWSCATEGORIES){
    return {...state, newscategories: action.payload }
  }

  if(action.type === ADDEDCATEGORY){
    return {...state, msg: action.payload.msg, newscategories: [action.payload.data ,...state.newscategories], loading: false }
  }

  if(action.type === ERRORADDEDCATEGORY){
    return {...state, msg: action.payload, loading: false }
  }

  if(action.type === LOADER){
    return {...state, loading: action.payload }
  }




  return state
}

export default newscategoriesReducer
