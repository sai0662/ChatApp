export const GETNEWSPOSTS = 'getnewsposts'
const ADDNEWSPOST = 'addnewspost'
const EDITNEWSPOST = 'editnewspost'
const DELETENEWSPOST = 'deletenewspost'




const initValue = {
  newsposts: []
}


const newspostsReducer = (state = initValue , action) => {
  console.log('action',action)

  if(action.type === GETNEWSPOSTS){
    console.log('action payload',action.payload)
    return {...state,  newsposts: action.payload }
  }
  return state
}

export default newspostsReducer
