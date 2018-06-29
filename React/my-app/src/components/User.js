import React, { Component } from 'react';
import '../assets/css/user.css';
class User extends Component{
    render(){
        return(
            
<React.Fragment>
<div className="User">
  <header>
    <div className="user">
        <a href="#">
            <img src="./img/icon/user.png" className="ui-border-tb"/>
        </a>
    </div>

    <div className="userinfo">
        <h1>李嘉桦同学</h1>
        <h2><i className="ui-icon-tag-svip fl" style={{"lineHeight":"12px"}}></i>超级会员</h2>
    </div>

    <div className="right_icon">
        <a href="javascript:;" className="frs"><i className="ui-icon-comment"></i></a>
        <a href="#" className="fr ui-p-text">设置</a>

    </div>
</header>
<section className="ui-f-title ui-border-b">
    <a href="javascript:;"><i className="ui-icon-file"></i>待支付</a>
    <a href="javascript:;"><i className="ui-icon-history" style={{"background": "#e25b5b"}}></i>待发货</a>
    <a href="javascript:;"><i className="ui-icon-refresh" style={{"background": "#62d07a"}}></i>待收货</a>
    <a href="javascript:;"><i className="ui-icon-comment" style={{"background": "#d6c46a"}}></i>待评价</a>
    <a href="javascript:;"><i className="ui-icon-add-group" style={{"background": "#ca6abe"}}></i>待维权</a>
</section>

<aside>
    <ul>
        <li className="ui-border-b"><i className="ui-icon-history fl"></i><a href="#" className="fl">全部订单</a><i className="ui-icon-next fr"></i></li>
        <li className="ui-border-b"><i className="ui-icon-like fl"></i><a href="#" className="fl">我的优惠</a><i className="ui-icon-next fr"></i></li>
        <li className="ui-border-b"><i className="ui-icon-wallet fl"></i><a href="#" className="fl">我的红包</a><i className="ui-icon-next fr"></i></li>
        <li className="ui-border-b"><i className="ui-icon-scan fl"></i><a href="#" className="fl">我的会员</a><i className="ui-icon-next fr"></i></li>
        <li className="ui-border-b"><i className="ui-icon-collect fl"></i><a href="#" className="fl">我的收藏</a><i className="ui-icon-next fr"></i></li>
        <li className="ui-border-b"><i className="ui-icon-cart fl"></i><a href="#" className="fl">我的购物</a><i className="ui-icon-next fr"></i></li>
    </ul>
</aside>
<div style={{"height":"3rem"}}></div>
</div>
</React.Fragment>
        )
    }
}
export default User;