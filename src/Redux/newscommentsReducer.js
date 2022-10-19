const GETNEWSCOMMENTS = 'getnewscomments'
// const ADDNEWSPOST = 'addnewspost'
// const EDITNEWSPOST = 'editnewspost'
// const DELETENEWSPOST = 'deletenewspost'

const initValue = {
  newscomments: []
}


const newscommentsReducer = (state = initValue , action) => {
  console.log('action',action)
  return state

}

export default newscommentsReducer
