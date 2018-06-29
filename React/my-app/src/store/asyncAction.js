export const asyncAction=(url,dispatch,type)=>{
    dispatch({type:'SHOW_LOADING'});
    setTimeout(()=>{
        fetch(
            url
        ).then(
            res=>res.json()
        ).then(
            data=>{
                dispatch({type:'HIDE_LOADING'});
                dispatch({type:type,payload:data});
            }
        )
    },1000)
};

export const asyncAction2=(url,dispatch,type,history)=>{
    dispatch({type:'SHOW_LOADING'});
    setTimeout(()=>{
        fetch(
            url
        ).then(
            res=>res.json()
        ).then(data=>{
            dispatch({type:"HIDE_LOADING"});
            dispatch({type:type,payload:data});
            history.replace({pathname:'/user'});//push replace 路由监听，拿不到跳转后的链接
            dispatch({type:'SHOW_FOOT'});
            dispatch({type:'HIDE_NAV'});
        })
    },1000)
};