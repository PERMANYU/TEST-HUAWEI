import React,{Component} from 'react';
import {Link} from  "react-router-dom"
import img1 from '../assets/img/pd/pd2.jpg'
const List = (props) =>{
    let {list} = props;
    console.log(list)
        return (
            <ul>
            {
              list && list.map((item,index)=>{
                return (
                  <li key={item.id} style={{marginTop:"3rem",marginLeft:"2rem",width:"40%",float:"left"}}>
                    <Link
                      to={{pathname:'/buycar/'+item.id,}}
                    >
                    <img src={img1} alt="" style={{width:"6rem",margin:"1px"}}/>
                      <h2 style={{font:"18px/20px ''",color:"#999"}}>{item.id}.{item.title}</h2>
                      <p style={{font:"12px/20px ''",color:"#f0f"}}>{item.detail}</p>
                      <p>{item.main}</p>
                    </Link>
                  </li>
                )
              })
            } 
    
          </ul>
        );
    }

export default List;