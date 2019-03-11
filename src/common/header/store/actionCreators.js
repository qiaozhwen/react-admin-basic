//存储方法

import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const changeList = (data,number)=>({
    type:constants.CHANGE_LIST,
    data:fromJS(data),
    totalPage:Math.ceil(data.length/10),
    totalItem:fromJS(number)
})
export const searchFocus =() =>(
    {
     type:constants.SEARCH_FOCUS  
     
    }
);
export const searchBlur =() =>(
    {
     type:constants.SEARCH_BLUR   
    }
);
export const mouseEnter =() =>(
    {
     type:constants.MOUSE_ENTER   
    }
);
export const mouseLeave =() =>(
    {
     type:constants.MOUSE_LEAVE   
    }
);
export const changePage =(page,totalItem)=>(
    {
     type:constants.CHANGE_PAGE,
     page:page,
     totalItem:totalItem
    }
)

//返回一个函数,必须用redux-thunk这个中间件
export const getList = ()=>
    {
        return (dispatch)=>{
            axios.get('/api/headerList.json').then((res)=>{
                
                const data = res.data;
               
                //用dispatch方法将action派发给store
                dispatch(changeList(data.data,data.data.length))
                console.log(data)
            }).catch((res)=>{
                console.log('error')
            })
        }
    }
