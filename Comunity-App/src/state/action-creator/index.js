export const setUserDetails=(details)=>{
    return (dispatch)=>{
        dispatch({
            type:'set',
            payload:details
        })
    }
}

export const chatProvider=(chat)=>{
    return (dispatch)=>{
        dispatch({
            type:'set',
            payload:chat
        })
    }
}


// export const widrawMoney=(amount)=>{
//     return (dispatch)=>{
//         dispatch({
//             type:'widraw',
//             payload:amount
//         })
//     }
// }