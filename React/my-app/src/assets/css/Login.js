import React, { Component } from 'react';
class Login extends Component{
    render(){
        return(
            <div className="login">
            <div className="login-title"><p>推浪网登录</p>
                <i></i>
            </div>
            <form method="post" action="success.html">
            <div className="login-bar">
                <ul>
                    <li><img src="../assets/img/pd/login_user.png"/><input type="text" className="text" placeholder="请输入用户名" /></li>
                    <li><img src="../assets/img/pd/login_pwd.png"/><input type="password" className="psd" placeholder="请输入确认密码" /></li>
                </ul>
            </div>
            <div className="login-btn">
                <button className="submit" type="submit">登陆</button>
                <a href="register.html"><div className="login-reg"><p>莫有账号，先注册</p></div></a>
            </div>
            </form>
        </div>
        )
    }
}
export default Login;