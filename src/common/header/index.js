import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators} from '../../pages/login/store';
import { Link } from 'react-router-dom';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style'






class Header extends Component {
    getListArea() {
        const {focused,list,totalPage,totalItem,page,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage} = this.props;
        const newList = list.toJS();
        const pageList=[];
        for(let i=(page-1)*10;i<page*10;i++){
                if(i<totalItem){
                    pageList.push(
                        <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                    )
                }

        }


        if (focused || mouseIn) {
            console.log(focused)
            return (
            <SearchInfo 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick = {()=>handleChangePage(page,totalPage,this.spinIcon)}>
                    {/*ref可以获取到react渲染出的组件的真实的节点*/}
                    <i ref={(icon)=>{this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                        换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                {<SearchInfoList>
                {pageList}
                    
                </SearchInfoList> }
            </SearchInfo>
            )
        } else {
            return null;
        }

    }
    render() {
        const {focused,handleInputFocus,handleInputBlur,list,login,logout} = this.props;
        return (
            <HeaderWrapper>
                <Link to='/'>
                <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        login?<NavItem onClick={logout} className='right'>退出</NavItem>:
                        <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                    }
                   
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused} 
                            timeout={200}
                            classNames="slide">
                            <NavSearch className={focused ? 'focused' : ''}
                                onFocus={()=>handleInputFocus(list)}
                                onBlur={handleInputBlur} >
                                </NavSearch>
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                    <Button className='writting'>
                        <i className="iconfont">&#xe608;</i>写文章
                        </Button>
                    <Button className='reg'>注册</Button>
                    </Link>
                </Addition>
            </HeaderWrapper>
        )
    }
}

//提取出store只剩render的Header组件是一个无状态组件，可以把它写成一个函数来提高性能





//发送state(数据)给store
const mapStateToProps = (state) => {
    //发送数据给store
    return {
        //focused后面的是immutable对象的get()方法获取属性
        //focused:state.get('header').get('focused')或者：
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage:state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalItem:state.getIn(['header','totalItem']),
        login:state.getIn(['login','login'])
        
    }
}
//发送action（方法）给store
const mapDispathToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
           if(list.size===0){
            dispatch(actionCreators.getList())
           }
            
           
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {

            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle = parseInt(originAngle,10);
            }else{
                originAngle=0;
            }

            spin.style.transform = 'rotate('+(originAngle+360)+'deg)'
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
           
        },
        logout(){
            dispatch(loginActionCreators.logout())
        }
    
    }

}

//让Header组件和redux的Store建立连接
export default connect(mapStateToProps, mapDispathToProps)(Header);