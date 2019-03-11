import { createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;


//把store和reducer && composeEnhancers（浏览器数据调试）建立连接
const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk)
));

export default store;
