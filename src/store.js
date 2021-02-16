import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const thingsReducer = (state={ count: 0, data: {}}, action)=> {
  console.log(action);
  if(action.type === 'FETCH_THINGS'){
    state = {...state, data: {...state.data, [action.idx]: action.things}};
  }
  if(action.type === 'SET_COUNT'){
    state = {...state, count: action.count};
  }
  return state;
};

const store = createStore(combineReducers({
  things: thingsReducer 
}), applyMiddleware(thunk));

const _fetchThings = ({idx, things})=> {
  return {
    idx,
    things,
    type: 'FETCH_THINGS'
  };
};

const _setCount = (count)=> {
  console.log(count);
  return {
    type: 'SET_COUNT',
    count
  };
};

const fetchThings = (idx)=> {
  return async(dispatch, getState)=> {
    const things = getState().things.data[idx];
    if(things){
      dispatch(_fetchThings({idx, things}))
    }
    else {
      const { things, count } = (await axios.get(`/api/things?idx=${idx}`)).data
      dispatch(_fetchThings({ things, idx }));
      dispatch(_setCount(count));
    }
  };
};

export { fetchThings };

export default store;

