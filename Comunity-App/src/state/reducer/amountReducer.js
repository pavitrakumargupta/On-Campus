 const  reducer=(state="unset",action )=>{
    if(action.type=='set'){
        return action.payload
    } else{
        return state
    }
}
export default reducer