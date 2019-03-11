
//immutable提供的fromJS可将JS转化为immutable对象
import { fromJS } from 'immutable';
import * as constants from './constants';


//
const defaultState = fromJS({
    slickList:[],
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false
});

//初始化接受defaultState作为state初始值，后面不停的接收发来的state和action，
//最终返回一个纯函数reducer发给store
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_HOME_DATA:
            return state.merge({
                slickList:fromJS(action.slickList),
                articleList: fromJS(action.articleList),
                recommendList: fromJS(action.recommendList)
            });
        case constants.ADD_ARTICLE_LIST:
            return state.merge({
                'articleList': state.get('articleList').concat(action.list),
                'articlePage': action.nextPage
            });
        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll',action.show);
        default:
            return state;
    }


}

