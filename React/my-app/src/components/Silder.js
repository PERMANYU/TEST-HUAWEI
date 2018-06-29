import React from 'react'
// import img1 from '../assets/images/img_1.jpg';
// import img2 from '../assets/images/img_2.jpg';
// import img3 from '../assets/images/img_3.jpg';
// import '../assets/css/silder.css';
// import '../assets/css/home.css';
// import '../assets/css/base.css';
// import '../assets/css/user.css';


import ReactSwipe from 'react-swipe';

class Silder extends React.Component{
  render(){
    return (
      <React.Fragment>
        <section id="slider">
            <div className="demo-item">
                <div className="demo-block">
                    <div className="ui-slider" >
                        {/* <ReactSwipe className="carousel ui-slider-content" swipeOptions={{continuous: true, auto:2000,width: "300%"}}>
                            <div><span style={{"backgroundImage":"url(./img/banner/banner9.png)"}}></span></div>
                            <div><span style={{"backgroundImage":"url(./img/banner/banner7.jpg)"}}></span></div>
                            <div><span style={{"backgroundImage":"url(./img/banner/banner8.jpg)"}}></span></div>
                            <div><span style={{"backgroundImage":"url(./img/banner/banner9.jpg)"}}></span></div>
                        </ReactSwipe>    
                         */}
                         <ReactSwipe className="carousel" swipeOptions={{continuous: true, auto:2000}}>
                            <div style={{background:'#399'}}><img src="./img/banner/banner9.png" style={{width:"100%",height:"100%"}}/></div>
                            <div style={{background:'#393'}}><img src="./img/banner/banner8.jpg" style={{width:"100%",height:"100%"}}/></div>
                            <div style={{background:'#939'}}><img src="./img/banner/banner7.jpg" style={{width:"100%",height:"100%"}}/></div>
                            <div style={{background:'#939'}}><img src="./img/banner/banner9.jpg" style={{width:"100%",height:"100%"}}/></div>
                          </ReactSwipe>
                    </div>
                </div>
             </div>
         </section>
      </React.Fragment>
  //      <section id="slider">
  //      <div className="demo-item">
  //          <div className="demo-block">
  //              <div className="ui-slider" style="paddingTop:49.25%">
  //                  <ul className="ui-slider-content" style="width: 300%">
  //                      <div><span ></span></div>
  //                      <div><span style="backgroundImage:url(themes/img/banner/banner7.jpg)"></span></div>
  //                      <div><span style="backgroundImage:url(themes/img/banner/banner8.jpg)"></span></div>
  //                      <div><span style="backgroundImage:url(themes/img/banner/banner9.jpg)"></span></div>
  //                  </ul>
  //              </div>
  //          </div>
  //      </div>
  //  </section>
    )
  }
  // componentDidMount(){
  //   var mySwipe=new Swipe($('.banner')[0],{
  //     auto:2000,
  //     continuous:true,
  //     stopPropation:true,
  //     callback:function (index,element){
  //       $('.banner ol li').removeClass('active');
  //       $('.banner ol li').eq(index).addClass('active');
  //     }
  //   })
  // }
}
export default Silder;