import React, { PureComponent } from 'react';
import { HomeWrapper, HomeLeft, HomeRight,BackTop } from './style';
import Topic from './components/Topic';
import List from './components/List';
import SimpleSlider from './components/SimpleSlider'; 
import Recommend from './components/Recommend';
import {actionCreators} from './store';
import {connect} from 'react-redux';

class Home extends PureComponent {

    

    handleScrollTop(){
        window.scrollTo(0,0);
    }


    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <SimpleSlider/>
                    <Topic/>
                    <List/>

                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    
                </HomeRight>
                {this.props.showScroll ?<BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>:null}
                
            </HomeWrapper>
        )
    }

    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillUnMount(){
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }


    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }

}



const mapState = (state)=>({
    showScroll:state.getIn(['home','showScroll'])
})


const mapDispath = (dispatch)=>({
    changeHomeData(){
        const action = actionCreators.getHomeInfo();
        dispatch(action);
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop>400){
            dispatch(actionCreators.toggleTopShow(true))
        }else{
            dispatch(actionCreators.toggleTopShow(false))
        }
        
    }
})

export default connect(mapState,mapDispath)(Home) ;