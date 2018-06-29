import React from 'react'
import Silder from'./Silder.js'
import UiForm from'./UiForm.js'
// import '../assets/css/header.css';
// import '../assets/css/home.css';
// import '../assets/css/base.css';

// import {Route,NavLink,Redirect,Switch} from 'react-router-dom'

class Header extends React.Component{
  render(){
    return (
   <React.Fragment>
    <header id="ui-header">
      <div className="ui-centre">
        <Silder/>       
        <UiForm/>
      </div>
    </header>
   </React.Fragment>
    )
  }
}
export default Header;