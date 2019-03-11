
//immutable提供的fromJS可将JS转化为immutable对象
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    title:'',
    content:''
});

//初始化接受defaultState作为state初始值，后面不停的接收发来的state和action，
//最终返回一个纯函数reducer发给store
export default (state = defaultState, action) => {
    switch (action.type) {
       case constants.CHANGE_DETAIL:
       return state.merge({
           title:action.title,
           content:action.content
       })
        default:
            return state;
    }


}

