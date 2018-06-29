import React from 'react'
// import '../assets/css/footer.css';
// import '../assets/css/home.css';
// import '../assets/css/base.css';
import {Link} from 'react-router-dom'
import {Route,NavLink,Redirect,Switch} from 'react-router-dom'
class Footer extends React.Component{
  render(){
    return (
			<React.Fragment>
			<div style={{"height":"3.4rem", "width":"100%", "overflow":"hidden"}}></div>
			<footer id="" className="ui-footer ui-border-t">
			<ul className="clearfix">
					<li>
							<NavLink to="/home" activeClassName="on"><i className="ui-icon-home"></i><p>首页</p></NavLink>
					</li>
					<li>
							<NavLink to="/search" activeClassName="on"><i className="ui-icon-search" style={{"fontSize":"42px"}}></i><p>搜索</p></NavLink>
					</li>
	
					<li>
							<NavLink to="/buycar" activeClassName="on"><i className="ui-icon-cart"></i><p>购物车</p></NavLink>
					</li>
					<li>
							<NavLink to="/user" activeClassName="on"><i className="ui-icon-personal"></i><p>我的</p></NavLink>
					</li>
			</ul>
	 </footer>
	 </React.Fragment>
	
    )
  }
}
export default Footer;