import * as constants from './constants';
//immutable提供的fromJS可将JS转化为immutable对象
import { fromJS } from 'immutable';



//
const defaultState = fromJS({
        focused:false,
        mouseIn:false,
        list:[],
        page:1,
        totalPage:1,
        totalItem:0
    });
            
    //初始化接受defaultState作为state初始值，后面不停的接收发来的state和action，
    //最终返回一个纯函数reducer发给store
    export default (state = defaultState, action )=>{
        switch(action.type){
            case constants.SEARCH_FOCUS:
            return state.set('focused',true);
            case constants.SEARCH_BLUR:
            return state.set('focused',false);
            case constants.CHANGE_LIST:
            //merge可以同时改变多个数据的内容
            return state.merge({
                list:action.data,
                totalPage:action.totalPage,
                totalItem:action.totalItem
            })
            case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
            case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);
            case constants.CHANGE_PAGE:
            return state.set('page',action.page);
            
            default:
            return state;
        }

        
        // if(action.type ===constants.SEARCH_FOCUS){
        //     //immutable对象的set方法，回结合之前的immutable对象的值
        //     //和设置的值，返回一个全新的对象
        //     return state.set('focused',true);
        // }
        // if(action.type ===constants.SEARCH_BLUR){
        //     return state.set('focused',false);
        // }
        // if(action.type===constants.CHANGE_LIST){
          
        //     return state.set('list',action.data);
        // }
        
        // return state;
    }
    
    