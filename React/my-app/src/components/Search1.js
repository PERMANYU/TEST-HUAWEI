 import React,{Component} from 'react';
 import fetchJsonp from 'fetch-jsonp';
 import pubsub from 'pubsub-js';
//  console.log(fetchJsonp);

 class Search extends Component{
     constructor(){
         super();
         this.state={
             ipt:''
         }
         this.changeIpt = this.changeIpt.bind(this);
     }
     changeIpt(ev){//双向数据绑定
            this.setState({
                ipt:ev.target.value
            });
       this.setState((prevState)=>{
         console.log(prevState);
         fetchJsonp(
             'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + prevState.ipt,
             {
                 jsonpCallback:'cb'
             }
         ).then(
             res=> res.json()
         ).then(
             data=>pubsub.publish('list',data) //发布数据
         )
       });     
     }
     render(){
         return (
             <input value={this.state.ipt} onChange={this.changeIpt}/>
         )
     }
 }
 export default Search;