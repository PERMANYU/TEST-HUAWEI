
import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Login from "../components/Login";
import {connect} from 'react-redux';
const AuthUser = ({component:Component,user,...rest})=>{
  console.log(user);
  return <Route {...rest} render={(props)=>(
    user.auth?
    <Component {...props} data={user.data}/> :
    <Redirect to="/login"/>
  )}/>
};

const mapStateToProps = state=>({
  user:state.userData
});
const mapDispatchToProps= dispatch=>({});

export default connect(mapStateToProps,mapDispatchToProps)(AuthUser);















/*const AuthUser = props => {
  console.log('路由守卫调用了',props);
  return <div>xxx</div>
};*/

/*const AuthUser = ({component:Component,...rest}) => {

  console.log('路由守卫调用了',Component,rest);

  // return <Component />
  return <Route {...rest} />

};*/

/*const AuthUser = ({component:Component,...rest}) => {

  console.log('路由守卫调用了',Component,rest);

  // return <Component />
  return <Route {...rest} render={(props)=>{
    console.log(props);
    if(Math.random()<.5){
      return <Component {...props} />
    }else{
      return <Redirect to="/login"/>
    }
  }} />

};*/

/*const AuthUser = ({component:Component,...rest}) => (
  <Route {...rest} render={(props)=>{
    return Math.random()<.5 ?
      <Component {...props} /> :
      <Redirect to="/login"/>
  }} />
);*/

/*const AuthUser = ({component:Component,...rest}) => (
  <Route {...rest} render={(props)=>(
    Math.random()<.5 ?
      <Component {...props} /> :
      <Redirect to="/login"/>
  )} />
);*/

/*class AuthUser extends React.Component{
  render(){
    let {component:Component,...rest} = this.props;
    return (
      <Route {...rest} render={(props)=>(
        Math.random()<.5 ?
          <Component {...props} /> :
          <Redirect to="/login"/>
      )} />
    );
  }
}*/
  // 从状态库里面获取数据
// class AuthUser extends React.Component{
//   state={
//     hasAuth:false, 
//     auth:false,
//     data:{}
//   };
  // componentDidMount(){
  //   fetch(
  //     `./data/user.json`
  //   ).then(
  //     res=>res.json()
  //   ).then(
  //     res=>this.setState({
  //       hasAuth:true,
  //       auth:res.auth,
  //       data:res.data
  //     })
  //   )
  // }
//   render(){
//     let {component:Component,user,...rest} = this.props;
//     if (!this.state.hasAuth) return null;
//     return (
//       <Route {...rest} render={(props)=>(
//         this.state.auth ?
//           <Component {...props} data={this.state.data} /> :
//           <Redirect to="/login"/>
//       )} />
//     );
//   }
// }


// export default AuthUser;