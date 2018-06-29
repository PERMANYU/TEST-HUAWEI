 import React,{Component} from 'react';
//  import fetchJsonp from 'fetch-jsonp';
//  import pubsub from 'pubsub-js';
//  import "../assets/css/search.css"
//  import "../assets/css/base.css"
//  import "../assets/css/home.css"
//  import '../assets/css/user.css';
//  console.log(fetchJsonp);
import List from './List'
import axios from 'axios';
axios.defaults.withCredentials=true; 
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {asyncAction} from '../store/asyncAction';
import NewList from './NewList';
 class Search extends Component{
    constructor(props){
        super(props)
        let url=`/data/index1.data`;
        props.get(url); 
        this.state = {
            list:[]
        };
         posts: []
       };
      componentDidMount() {
        axios.get(
            `http://localhost:3000/users`
        ).then(
        data=>this.setState({list:data}));
      }
     render(){
         let homeData = this.props.homeData;
         let get = this.props.get;
    return(
    <React.Fragment>
     <header id="ui-search-header">
        <div className="ui-s-search clearfix ui-border-tb">
            <div className="fl ui-s-box">
                <form>
                    <input type="text" placeholder="" value="买商品请点击图片" className="ui-border-tb"/>
                </form>
            </div>
            <div className="fl" style={{"div":"10%"}}>
                <i className="ui-icon-search" style={{"fontSize":"36px","lineHeight":"32px"," color":"#999"}}></i>
            </div>
        </div>
        <div style={{"padding":".2rem"}}>
            <ul className="ui-list-default">
                <li className="top"><span>港版iphone7</span></li>
                <li className="top" style={{margin:".5rem"}}><span>港版iphone7</span></li>
                <li className="top"><span>Smartisan M1</span></li>
                <li><span>皇帝的新装</span></li>
                <li><span>笔记本</span></li>
                <li><span>智能手环</span></li>
                <li><span>时尚运动</span></li>
                <li><span>黑科技</span></li>
                <li><span>华为p7</span></li>
                <li><span>三星</span></li>
                <li><span>小米</span></li>
                <li><span>oppo</span></li>
            </ul>
            <NewList list={homeData} dataName="home"/>
            <List list={this.state.list.data}/>
        </div>    
    </header>)
    </React.Fragment>
        )
    }
}
    //获取store
    const mapStateToProps=state=>({
        homeData:state.homeData,
      });
      
      const mapDispatchToProps=dispatch=>({
        get:(url)=>{asyncAction(url,dispatch,'UPDATE_HOME_DATA')}
      });
      //容器组件 -> 链接->counter 组件
      export default connect(
          mapStateToProps,
          mapDispatchToProps
      )(Search);