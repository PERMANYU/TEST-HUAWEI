import React, { Component } from 'react';
import '../assets/css/login.css'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {asyncAction2} from "../store/asyncAction";
class Login extends Component{
    render(){
        return(
            <div className="login">
             <header className="ui-border-tb" style={{"paddingBottom":"1px"}}>
                <div className="ui-c-header clearfix">
                    <div className="fl" style={{"width":"5%"}}>
                        <i className="ui-icon-return" onClick={()=>{this.props.history.go(-1)}}></i>
                    </div>
                    <div className="fl ui-c-cart">
                        <h2>登录</h2>
                    </div>
                </div>
            </header>
            <form method="post" action="success.html" style={{}}>
            <div className="login-bar">
                <ul>
                    <li><img src="./img/pd/login_user.png"/><input type="text" className="text" placeholder="请输入用户名" /></li>
                    <li><img src="./img/pd/login_pwd.png"/><input type="password" className="psd" placeholder="请输入确认密码" /></li>
                </ul>
            </div>
            <div className="login-btn">
                <button className="submit" type="button" onClick={()=>{
                    this.props.login(this.props.history)
                }}>登陆</button>
                <Link to={'/reg'}><div className="login-reg"><p>莫有账号，先注册</p></div></Link>
            </div>
            </form>
        </div>
        )
    }
}
const mapStateToProps=state=>({});
const mapDispatchToProps =dispatch=>({
    login:(history)=>{
        //dispatch({type:'UPDATE_USER',payload:{xxx:'双向绑定数据'}})
        asyncAction2('/data/user.json',dispatch,'UPDATE_USER_DATA',history)
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);