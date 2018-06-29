import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import img1  from '../assets/img/pd/pd1.jpg'
const NewList = (props) =>{
  let {list,dataType,addItem} = props;
  // console.log(list)
  return (
      <ul>
        {
          list.map((item,index)=>{
            return (
              <li key={item.id} style={{marginTop:"3rem",marginLeft:"2rem",width:"40%",float:"left"}}>
                <Link
                  to={{pathname:'/buycar/'+item.id,query:{dataType:dataType}}}
                >
                <img src={img1} alt="" style={{width:"6rem",margin:"1px"}} onClick={addItem.bind(this,item)}/>
                  <h2 style={{font:"18px/20px ''",color:"#999"}}>{item.id}.{item.title}</h2>
                  <p style={{font:"12px/20px ''",color:"#f0f"}}>{item.detail}</p>
                  <p>{item.main}</p>
                </Link>
              </li>
            )
          })
        }

      </ul>
  )
};

//获取store
const mapStateToProps = (state, ownProps) => {
  return {
    buyCar:state.buyCar
  }
};

//转发actins
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    addItem: (item) => {
      console.log('newlist 41',item)
      dispatch({
        type: 'ADD_ITEM',
        payload:item
      });
    }
  }
};
//容器组件 ->链接-> counter组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList);