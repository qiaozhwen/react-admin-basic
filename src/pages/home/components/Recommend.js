import React, { PureComponent } from 'react';
import { RecommendWrapper, RecommendItem } from '../style';
import { connect } from 'react-redux';
class Recommend extends PureComponent {
    render() {
        const {list} = this.props;
        return (
            <RecommendWrapper>
                {list.map((item)=>{
                    return(
                        <RecommendItem key={item.get('id')} imgUrl={item.get('imgUrl')} />
                    )
                })}
                
               
            </RecommendWrapper>
        )
    }
}

const stateMap = (state) => ({
    list: state.getIn(['home', 'recommendList'])
    })
export default connect(stateMap, null)(Recommend);