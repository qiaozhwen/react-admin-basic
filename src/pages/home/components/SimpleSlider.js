import React, { PureComponent } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
 class SimpleSlider extends PureComponent {

 
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const { list } = this.props;

    return (
      <div>
        
        <Slider {...settings}>
        
        {
            list.map((item,index) => {
                return (
                  <div key={item.get('id')}>
                  <img alt='' className='banner-img' src={item.get('imgUrl')}/>
                  </div>
                )

            })
        }
       
    
        </Slider>
      </div>
    );
  }
}

const mapState = (state) => ({
  list: state.getIn(['home','slickList'])
})
export default connect(mapState, null)(SimpleSlider);