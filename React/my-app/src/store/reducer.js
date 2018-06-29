const reducer = (state,action) => {
  let {type,payload}=action;
  switch (type){
    case 'SHOW_NAV':
      return Object.assign({},state,{
        bNav:true
      });
      break;
    case 'HIDE_NAV':
      return Object.assign({},state,{
        bNav:false
      });
      break;
    case 'SHOW_FOOT':
      return Object.assign({},state,{
        bFoot:true
      });
      break;
    case 'HIDE_FOOT':
      return Object.assign({},state,{
        bFoot:false
      });
      break;
    case 'SHOW_LOADING':
      return Object.assign({},state,{
        bLoading:true
      });
      break;
    case 'HIDE_LOADING':
      return Object.assign({},state,{
        bLoading:false
      });
      break;
    case 'UPDATE_HOME_DATA':
      return Object.assign({},state,{
        homeData:payload
      });
    case 'UPDATE_FOLLOW_DATA':
      return Object.assign({},state,{
        followData:payload
      });
    case 'UPDATE_USER_DATA':
      return Object.assign({},state,{
        userData:payload
      });
    case 'CLEAR_HOME_DATA':
      return Object.assign({},state,{
        homeData:[]
      });
    case 'CLEAR_FOLLOW_DATA':
      return Object.assign({},state,{
        followData:[]
      });
    case 'ADD_ITEM':
      let find=false;
      state.buyCar.forEach((item,index)=>{
        if(item.id===payload.id){
          find=true;
          item.number++;
        }
      });
      if(!find){
        payload.number=1;
        state.buyCar.push(payload);
      }
      return Object.assign({},state,{
        buyCar:[...state.buyCar]
      });
    case 'REDUCE_ITEM':
      state.buyCar.forEach((item,index)=>{
        if(item.id===payload.id){
          find=true;
          item.number--;
          if(item.number<=0){
            state.buyCar.splice(index,1);
          }
        }
      });
      return Object.assign({},state,{
        buyCar:[...state.buyCar]
      });
    case 'REMOVE_ITEM':
      // console.log('reducer66',payload);
      state.buyCar.forEach((item,index)=>{
        if(item.id===payload.id){
          state.buyCar.splice(index,1);
        }
      });
      // console.log(state.buyCar);
      return Object.assign({},state,{
        buyCar:[...state.buyCar]
      });
    case 'REMOVE_ALL':
      return Object.assign({},state,{
        buyCar:[]
      });
    case 'CHECK_ARR':
      return Object.assign({},state,{
        arr:payload
      });
    default:
      return state;
  }
};



export default reducer;

