import React,{Component} from 'react';
import pubsub from 'pubsub-js';
class Category extends Component{
    render(){
        return (
 <React.Fragment>
   <section className="category ui-border-b" style={{"marginTop":".6rem"}}>
    <ul className="clearfix">
        <li>
            <a data-refresh="" data-track="Flight" data-cat="flight"  href="#">
                <span style={{"backgroundImage": "url(./img/icon/ic1.png)", "backgroundSize": "contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>充值</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Hotel" data-cat="hotel"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic2.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>礼券</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Vacation" data-cat="vacation"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic3.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>积分</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Destination" data-cat="Destination"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic4.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>正品</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Ticket" data-cat="ticket"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic5.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>门票</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Visa" data-cat="visa"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic6.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>全球</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Train" data-cat="train"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic7.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>高铁</strong>
            </a>
        </li>
        <li>
            <a data-refresh="" data-track="Member" data-cat="member"  href="#">
                <span style={{"backgroundImage":" url(./img/icon/ic9.png)", "backgroundSize":" contain"," opacity": "1"}} data-src="" className=""></span>
                <strong>邮件</strong>
            </a>
        </li>
    </ul>
</section>
<div className="divider ui-border-b"></div>

<section id="c" className="ui-header-cr ui-border-b">
    <header className="ui-header-ti">
        <h2>精选橱窗</h2>
        <a href="#" className="more">更多&nbsp;&nbsp;&nbsp;<i className="ui-icon-arrow"></i></a>
    </header>

    <main className="ui-main-br">
        <div className="ui-img">
            <a href="#"><img src="./img/banner/banner5.jpg" width="100%"/></a>
        </div>
    </main>
</section>
 </React.Fragment>
        );
    }
}
export default Category;