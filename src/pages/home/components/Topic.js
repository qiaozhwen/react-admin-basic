import React, { PureComponent } from 'react';
import { TopicWrapper } from '../style';
import { connect } from 'react-redux';
class Topic extends PureComponent {
    render() {
        return (
            <TopicWrapper>
                {/* {this.props.list.map((item) => {
                    return (
                        <div key={item.get('id')}>
                            {item.get('title')}
                        </div>
                    )


                })} */}
            </TopicWrapper>
        )
    }
}

const mapState = (state) => ({
    list: state.getIn(['home','topicList'])
})


//connect(从store拿数据，改数据)
export default connect(mapState, null)(Topic);