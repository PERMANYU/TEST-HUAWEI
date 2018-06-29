import React,{Component} from 'react';
import pubsub from 'pubsub-js';
// import '../assets/css/user.css';
// import '../assets/css/base.css';
// import '../assets/css/home.css';
class List extends Component{
    constructor(){
        super();
        this.state={
            list:[]
        };
        pubsub.subscribe('list',(message,data)=>{
            console.log('list',message,data.s)
            this.setState({
                list:data.s
            })
            console.log(this.state.list)
        })
    }
    render(){
        return (
            // <ul>
            //     {
            //         this.state.list.map((val,index)=>{
            //            return  <li key={index}>{val}</li>    //此处需要返回值
            //         })
            //     }
            // </ul>
        <React.Fragment>
           <section id="V" className="ui-header-cr" style={{"marginBottom":"0", "paddingBottom":"0"}}>
            <header className="ui-header-ti">
                <h2>新品上架</h2>
                <a href="#" className="more"></a>
            </header>
            <section className="clearfix around-other">
                <ul>
                    <li className="ui-border-b clearfix">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd1.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info ">
                                <h3>Apple iPhone 6s</h3>
                                <div><span>Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机.选择下方的移动、联通、电信优惠购，套餐有优惠，还有话费返还</span> <p className="around-other-price price"><span>￥</span> <strong>4788.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd2.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info">
                                <h3>苹果(Apple) iPhone 7</h3>
                                <div><span>移动联通电信4G手机 亮黑 128G 标配 电子发票送透明后壳+钢化膜 苹果产品激活后不支持七天无理由退换货</span> <p className="around-other-price price"><span>￥</span> <strong>6288.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd3.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info">
                                <h3>苹果(Apple) iPhone 6s</h3>
                                <div><span>4G手机 金色 公开版(16G ROM)标配苹果产品拆封激活后不支持七天无理由退换货 购买苹果6S plus</span> <p className="around-other-price price"><span>￥</span> <strong>3988.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b clearfix">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd4.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info ">
                                <h3>苹果(Apple) iPhone 7</h3>
                                <div><span>移动联通电信4G手机 玫瑰金 128G 标配原封未激活！激活后不支持七天无理由退换！苹果7P抢购</span> <p className="around-other-price price"><span>￥</span> <strong>5888.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd5.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info">
                                <h3>魅族 魅蓝U20</h3>
                                <div><span>32GB 全网通公开版 银色 移动联通电信4G手机 双卡双待双面玻璃材质，金属指纹全网通！ 魅族新品！</span> <p className="around-other-price price"><span>￥</span> <strong>1299.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd6.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info">
                                <h3>魅族 MX6 </h3>
                                <div><span>4GB+32GB 全网通公开版 香槟金 移动联通电信4G手机 双卡双待</span> <p className="around-other-price price"><span>￥</span> <strong>1999.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                    <li className="ui-border-b">
                        <a href="#">
                            <div className="around-other-image fl">
                                <div className="around-other-thumbnail" style={{"backgroundSize":"cover", "backgroundImage":"url(./img/pd/pd7.jpg)"," opacity":"1"}}></div>
                            </div>
                            <div className="around-other-info">
                                <h3>魅族 PRO 6 </h3>
                                <div><span>32GB 全网通电信版 银白色 移动联通电信4G手机 双卡双待购机送移动电源、智能手环！数量有限！赠完即止！</span> <p className="around-other-price price"><span>￥</span> <strong>2299.00</strong></p></div>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
        </section>
        <div className="divider ui-border-b "></div>
        </React.Fragment>
        );
    }
}
export default List;