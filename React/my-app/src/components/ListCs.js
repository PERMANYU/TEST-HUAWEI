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
      <section id="Cs" className="ui-header-cr  clearfix">
            <header className="ui-header-ti">
                <h2>促销活动</h2>
                <a className="more" href="#">更多&nbsp;&nbsp;&nbsp;<i className="ui-icon-arrow"></i></a>
            </header>
            <section className="destination">
                <ul className="clearfix">
                    <li>
                        <a href="#">
                            <div className="destination-image"><span className="" data-src="" style={{"backgroundImage":" url(./img/pd/a1.jpg)", "opacity":"1"}}></span></div>
                            <div className="destination-title">
                                <h3>索尼特价专区</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="destination-image"><span className="" data-src="" style={{"backgroundImage":" url(./img/pd/a2.jpg)", "opacity":"1"}}></span></div>
                            <div className="destination-title">
                                <h3>双核旗舰机</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="destination-image"><span className="" data-src="" style={{"backgroundImage":" url(./img/pd/a3.jpg)", "opacity":"1"}}></span></div>
                            <div className="destination-title">
                                <h3>蚂蚁花呗免息</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="destination-image"><span className="" data-src="" style={{"backgroundImage":" url(./img/pd/a4.jpg)", "opacity":"1"}}></span></div>
                            <div className="destination-title">
                                <h3>360旗舰机</h3>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
    </section>
 </React.Fragment>
        );
    }
}
export default List;