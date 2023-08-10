export const setUserDetails=(details)=>{
    return (dispatch)=>{
        dispatch({
            type:'set',
            payload:details
        })
    }
}

export const serverConnected=(serverConnected)=>{
    return (dispatch)=>{
        dispatch({
            type:'set',
            payload:serverConnected
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