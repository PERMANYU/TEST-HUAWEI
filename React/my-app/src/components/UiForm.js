import React from 'react'
// import '../assets/css/header.css';
// import '../assets/css/base.css';
// import '../assets/css/user.css';

// import {Route,NavLink,Redirect,Switch} from 'react-router-dom'

class UiForm extends React.Component{
  render(){
    return (
   <React.Fragment>
      <section id="ui-form">
            <div className="ui-form-color ui-form-color-nav" id="headsearch">
                <div className="ui-form-logo fl">
                    <a href="#"><span className="" data-src="" style={{"backgroundImage":"url(./img/icon/logo.png)", "backgroundSize": "contain","opacity":"1"}}></span></a>
                </div>
                <div className="ui-form-input fl"><input type="text" placeholder="搜索商品名称"/></div>
            </div>
      </section>
   </React.Fragment>
    )
  }
}
export default UiForm;