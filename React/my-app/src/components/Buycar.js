import * as React from 'react'
// import '../assets/css/home.css';
// import '../assets/css/buycar.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import img1 from '../assets/img/pd/pd1.jpg'
// import {Route,NavLink,Redirect,Switch} from 'react-router-dom'
class Buycar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {buyCar,removeItem,clearBuyCar,addItem,reduceItem}=this.props;
    return (
         <div>
            <header className="ui-border-tb" style={{"paddingBottom":"1px"}}>
                <div className="ui-c-header clearfix">
                    <div className="fl" style={{"width":"5%"}}>
                        <i className="ui-icon-return" onClick={()=>{this.props.history.go(-1)}}></i>
                    </div>
                    <div className="fl ui-c-cart">
                        <h2>购物车</h2>
                    </div>
                </div>
            </header>
            <section>
                <div className="ui-p-centre">
                    <ul>
                        {/* <li className="ui-border-b">
                            <div className="ui-p-box clearfix">
                                <div className="fl ui-p-choice">
                                    <i className="ui-icon-success ui-icon-cu"></i>
                                </div>
                                <div className="ui-p-product fl">
                                    <a href="#">
                                        <img src="./img/pd/pd1.jpg"/>
                                    </a>
                                </div>
                                <div className="ui-p-title">
                                    <h3>Apple iPhone 6s</h3>
                                    <p className="ui-t">玫瑰金色 移动联通电信4G手机</p>
                                    <p>4788元</p>
                                    <div className="ui-p-click ">
                                        <div className="ui-c1">-</div>
                                        <div className="ui-c2">1</div>
                                        <div className="ui-c3">+</div>
                                    </div>
                                </div>
                                <div className="fr ui-p-delete">
                                    <i className="ui-icon-delete"></i>
                                </div>
                            </div>
                        </li>
                        <li className="ui-border-b">
                            <div className="ui-p-box clearfix">
                                <div className="fl ui-p-choice">
                                    <i className="ui-icon-success ui-icon-cu"></i>
                                </div>
                                <div className="ui-p-product fl">
                                    <a href="#">
                                        <img src="./img/pd/pd2.jpg"/>
                                    </a>
                                </div>
                                <div className="ui-p-title">
                                    <h3>Apple iPhone 6s</h3>
                                    <p className="ui-t">玫瑰金色 移动联通电信4G手机</p>
                                    <p>4788元</p>
                                    <div className="ui-p-click ">
                                        <div className="ui-c1">-</div>
                                        <div className="ui-c2">1</div>
                                        <div className="ui-c3">+</div>
                                    </div>
                                </div>
                                <div className="fr ui-p-delete">
                                    <i className="ui-icon-delete"></i>
                                </div>
                            </div>
                        </li>
                        <li className="ui-border-b">
                            <div className="ui-p-box clearfix">
                                <div className="fl ui-p-choice">
                                    <i className="ui-icon-success"></i>
                                </div>
                                <div className="ui-p-product fl">
                                    <a href="#">
                                        <img src="./img/pd/pd3.jpg"/>
                                    </a>
                                </div>
                                <div className="ui-p-title">
                                    <h3>Apple iPhone 6s</h3>
                                    <p className="ui-t">玫瑰金色 移动联通电信4G手机</p>
                                    <p>4788元</p>
                                    <div className="ui-p-click ">
                                        <div className="ui-c1">-</div>
                                        <div className="ui-c2">1</div>
                                        <div className="ui-c3">+</div>
                                    </div>
                                </div>
                                <div className="fr ui-p-delete">
                                    <i className="ui-icon-delete"></i>
                                </div>
                            </div>
                        </li>
                        <li className="ui-border-b">
                            <div className="ui-p-box clearfix">
                                <div className="fl ui-p-choice">
                                    <i className="ui-icon-success"></i>
                                </div>
                                <div className="ui-p-product fl">
                                    <a href="#">
                                        <img src="./img/pd/pd4.jpg"/>
                                    </a>
                                </div>
                                <div className="ui-p-title">
                                    <h3>Apple iPhone 6s</h3>
                                    <p className="ui-t">玫瑰金色 移动联通电信4G手机</p>
                                    <p>4788元</p>
                                    <div className="ui-p-click ">
                                        <div className="ui-c1">-</div>
                                        <div className="ui-c2">1</div>
                                        <div className="ui-c3">+</div>
                                    </div>
                                </div>
                                <div className="fr ui-p-delete">
                                    <i className="ui-icon-delete"></i>
                                </div>
                            </div>
                        </li> */}
                        {
                            buyCar.map((item,index)=>{
                             return  <li className="ui-border-b"  key={item.id}>
                             <div className="ui-p-box clearfix">
                                 <div className="fl ui-p-choice">
                                     <i className="ui-icon-success ui-icon-cu"></i>
                                 </div>
                                 <div className="ui-p-product fl">
                                     <a href="#">
                                         <img src={img1}/>
                                     </a>
                                 </div>
                                 <div className="ui-p-title">
                                     <h3>Apple iPhone {item.id}</h3>
                                     <p className="ui-t">{item.main}</p>
                                     <p>4788元</p>
                                     <div className="ui-p-click ">
                                         <div className="ui-c1" onClick={reduceItem.bind(this,item)}>-</div>
                                         <div className="ui-c2">{item.number}</div>
                                         <div className="ui-c3" onClick={addItem.bind(this,item)}>+</div>
                                     </div>
                                 </div>
                                 <div className="fr ui-p-delete">
                                     <i className="ui-icon-delete" onClick={removeItem.bind(null,item)}></i>
                                 </div>
                             </div>
                         </li>
                            })
                        }
                        {/* <li className="ui-border-b">
                            <div className="ui-p-box clearfix">
                                <div className="fl ui-p-choice">
                                    <i className="ui-icon-success ui-icon-cu"></i>
                                </div>
                                <div className="ui-p-product fl">
                                    <a href="#">
                                        <img src="./img/pd/pd1.jpg"/>
                                    </a>
                                </div>
                                <div className="ui-p-title">
                                    <h3>Apple iPhone 6s</h3>
                                    <p className="ui-t">玫瑰金色 移动联通电信4G手机</p>
                                    <p>4788元</p>
                                    <div className="ui-p-click ">
                                        <div className="ui-c1">-</div>
                                        <div className="ui-c2">1</div>
                                        <div className="ui-c3">+</div>
                                    </div>
                                </div>
                                <div className="fr ui-p-delete">
                                    <i className="ui-icon-delete"></i>
                                </div>
                            </div>
                        </li> */}
                    </ul>
                    {buyCar.length?<button onClick={clearBuyCar}>清空购物车</button>:null}
                </div>
            </section>
            <footer className="ui-c-bottom ui-border-t">
                <div className="ui-bottom-submit  ">
                    <div className="price"><span className="is">共4件 金额：</span><br/><strong>213.80</strong> <span className="is">元</span></div>
                    <div className="btn"><a className="" href="#"><span>继续购物</span></a></div>
                    <div className="btn"><a className="ui-button" href="#"><span>去结算</span></a></div>
                </div>
            </footer>
           </div>
    )
  }
}
//获取store
const mapStateToProps = (state, ownProps) => {
    return {
      buyCar:state.buyCar
    }
  };
  
  //转发actins
  const mapDispatchToProps = (dispatch,ownProps) => {
    return {
      removeItem: (item) => {
        // console.log('buycar37',item);
        dispatch({
          type: 'REMOVE_ITEM',
          payload:item
        });
      },
      addItem: (item) => {
        // console.log('buycar37',item);
        dispatch({
          type: 'ADD_ITEM',
          payload:item
        });
      },
      reduceItem: (item) => {
        // console.log('buycar37',item);
        dispatch({
          type: 'REDUCE_ITEM',
          payload:item
        });
      },
      clearBuyCar: () => {
        dispatch({
          type: 'REMOVE_ALL'
        });
      }
    }
  };
  //容器组件 ->链接-> counter组件
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Buycar);