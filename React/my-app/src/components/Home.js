import React from 'react'
// import Silder from "./Silder";
import Header from './Header'
import ListV from "./ListA";
import ListCs from "./ListCs";
import Category from "./Category";
import pubsub from 'pubsub-js';
import {asyncAction} from '../store/asyncAction';
import {connect} from 'react-redux';
// import '../assets/css/user.css';
// import '../assets/css/base.css';
// import '../assets/css/home.css';
class Home extends React.Component{
  constructor(props){
    super();
    let url=`/data/index.data`;
    props.get(url);
  }
  // componentDidMount(){

  //   pubsub.publish('bLoading',true);

  //   setTimeout(()=>{
  //     fetch(
  //       `/data/index.data`
  //     ).then(
  //       res=>res.json()
  //     ).then(
  //       data=>{
  //         pubsub.publish('bLoading',false);
  //         this.setState({list:data})
  //       }
  //     )
  //   },1000)

  // }
  render(){
    // let list= this.state.list;
    // let dataName= this.state.dataName;
    let homeData= this.props.homeData;
    let get= this.props.get;
    return (
      <React.Fragment>
        <Header/>
        {/* <List list={list} dataName={dataName} /> */}
        <Category/>
        <ListV list={homeData} dataName="home" />
        <ListCs/>
      </React.Fragment>
    )
  }
}
const mapStateToProps=state=>({
  homeData:state.homeData,
});

const mapDispatchToProps=dispatch=>({
  get:(url)=>{asyncAction(url,dispatch,'UPDATE_HOME_DATA')}
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);