import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Loadable from 'react-loadable';
// import '../assets/css/home.css';
// import '../assets/css/base.css';
// import '../assets/css/user.css';
import Loading from "./Loading";
import {Route,Redirect,Switch} from 'react-router-dom'
const Home = Loadable({
  loader: () => import('./Home'),
 loading: Loading,
 loading:()=>{return null}
});
const Search = Loadable({
  loader: () => import('./Search'),
 loading: Loading,
 loading:()=>{return null}
});
const Buycar = Loadable({
  loader: () => import('./Buycar'),
 loading: Loading,
 loading:()=>{return null}
});
const User = Loadable({
  loader: () => import('./User'),
 loading: Loading,
 loading:()=>{return null}
});
const Login = Loadable({
  loader: () => import('./Login'),
 loading: Loading,
 loading:()=>{return null}
});
const Reg = Loadable({
  loader: () => import('./Reg'),
 loading: Loading,
 loading:()=>{return null}
});
// import Detail from "./Detail";
import Error from "./Error";
import AuthUser from "../guard/AuthUser";
import {connect} from 'react-redux';
class App extends React.Component{
  componentDidMount(){
    // this.routerView(this.props.location.pathname) //或者利用中间件
  }
  componentWillUpdate(){
    // this.routerView(this.props.location.pathname)   ///目前 没有更好的钩子此钩子不合适用先用一下方法代替
  }
  routerView(path){
    let {bNav,bFoot,bLoading,viewNav,viewFoot} = this.props;
    console.log(path);
    if(/home|search/.test(path)){
      viewNav(true);viewFoot(true);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
    if(/login|reg|buycar/.test(path)){
      viewNav(false);viewFoot(false);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
    if(/user/.test(path)){
      console.log(path,'user/.....')
      viewNav(false);viewFoot(true);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
  } 
  render(){
    let path = this.props.location.pathname;
    let {bNav,bFoot,bLoading,viewNav,viewFoot} = this.props;
    console.log(path);
    if(/home|search/.test(path)){
      viewNav(true);viewFoot(true);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
    if(/login|reg|buycar/.test(path)){
      viewNav(false);viewFoot(false);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
    if(/user/.test(path)){
      console.log(path,'user/.....')
      viewNav(false);viewFoot(true);
        /*setTimeout(()=>{
        viewNav(true);viewFoot(true);
      },0)*/
    }
    return (
      <React.Fragment>
        {this.props.bLoading && <Loading/>}
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/buycar" component={Buycar}/>
          <Route path="/search" component={Search}/>
          <AuthUser path="/user" component={User}/>
          <Route path="/login" component={Login}/>
          <Route path="/reg" component={Reg}/>
          {/* <Route path="/detail/:aid" component={Detail}/> */}
          <Redirect exact from="/" to="/home" />
          <Route component={Error}/>
        </Switch>
        {this.props.bFoot ? <Footer/> : null}
      </React.Fragment>
    )
  }
}
  const mapStateToProps=state=>({
    bNav:state.bNav,
    bFoot:state.bFoot,
    bLoading:state.bLoading
  });
  const mapDispatchToProps=dispatch=>({
    viewNav:(bl)=>{
      bl?dispatch({type:"SHOW_NAV"}):dispatch({type:"HIDE_NAV"})
    },
    viewFoot:(bl)=>{
      bl?dispatch({type:"SHOW_FOOT"}):dispatch({type:"HIDE_FOOT"})
    }
  });
  export default connect(mapStateToProps,mapDispatchToProps)(App);