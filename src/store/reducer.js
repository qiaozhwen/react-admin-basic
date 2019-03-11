import { combineReducers } from 'redux-immutable';//将小的reducer合并成大的reducer
import {reducer as headerReducer} from '../common/header/store';
import  {reducer as homeReducer} from '../pages/home/store';
import {reducer as detailReducer} from '../pages/detail/store';
import {reducer as loginReducer} from '../pages/login/store';
//redux-immutable

//将小的reducer整合成一个大的reducer，再export出来
export default combineReducers({
    header:headerReducer,
    home:homeReducer,
    detail:detailReducer,
    login:loginReducer
})