import React,{Component} from 'react';
import pubsub from 'pubsub-js';
// import '../assets/css/user.css';
// import '../assets/css/base.css';
// import '../assets/css/home.css';
const List =({list,dataName})=>(
        <React.Fragment>
           <section id="V" className="ui-header-cr" style={{"marginBottom":"0", "paddingBottom":"0"}}>
            <header className="ui-header-ti">
                <h2>新品上架</h2>
                <a href="#" className="more"></a>
            </header>
            <section className="clearfix around-other">
                <ul>
                  {
                      list.map((item,index)=>{
                       return(
                    <li key={item.id} className="ui-border-b clearfix">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd1.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info ">
                                <h3>{item.id}.{item.title}</h3>
                                <div><span>{item.detail}</span><p className="around-other-price price"><span>￥</span><strong>{item.id}</strong></p></div>
                            </div>
                        </a>
                    </li>
                       )
                    })
                  }
                    {/* <li className="ui-border-b clearfix">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd1.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info ">
                                <h3>Apple iPhone 6s</h3>
                                <div><span>Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机.选择下方的移动、联通、电信优惠购，套餐有优惠，还有话费返还</span> <p className="around-other-price price"><span>￥</span> <strong>4788.00</strong></p></div>
                            </div>
                        </a>
                    </li> */}
                </ul>
            </section>
        </section>
        <div className="divider ui-border-b "></div>
        </React.Fragment>
                )
export default List;