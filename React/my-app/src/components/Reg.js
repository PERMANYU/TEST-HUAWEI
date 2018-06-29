import React, { Component } from 'react';
import {Prompt} from 'react-router-dom';
import {Link} from 'react-router-dom'
import "../assets/css/register.css"
class Reg extends Component{
    render(){
        return(
    <React.Fragment>      
        <div id="layout">
            <header className="ui-border-tb" style={{"paddingBottom":"1px"}}>
                <div className="ui-c-header clearfix">
                    <div className="fl" style={{"width":"5%"}}>
                        <i className="ui-icon-return" onClick={()=>{this.props.history.go(-1)}}></i>
                    </div>
                    <div className="fl ui-c-cart">
                        <h2>注册</h2>
                    </div>
                </div>
            </header>
            <span>注册</span>
            <form  method="post">
            <ul>
                <p id="err_msg"></p>
                <li><i className="un"><img src="./img/pd/user_name.png"/></i><input className="username" type="text" placeholder="请输入用户名" /></li>
                <li><i className="yz"><img src="./img/pd/msg.png"/></i><input className="yzm" type="text" placeholder="请输入手机验证码" /><input type="button" id="send" value="获取验证码" /></li>
                <li><i className="pw"><img src="./img/pd/pwd.png"/></i><input className="pwd" type="password" placeholder="请输入密码" /></li>
                <li><i className="pw2"><img src="./img/pd/pwd.png"/></i><input className="pwd2" type="password" placeholder="请输入确认密码" /></li>
                <div className="queren"><input className="fx" type="checkbox" /><p>我已阅读并同意《用户协议》</p></div>
            </ul>
                <div className="reg_btn">
                    <button className="submit" type="submit">注册</button>
                    <Link to={"/login"}><div className="reg-login"><p>已有帐号，立即登陆</p></div></Link>
                </div>
            </form>
        </div>
    </React.Fragment>  
        )
    }
}
export default Reg;