import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const thingsReducer = (state={ count: 0, data: {}}, action)=> {
  if(action === 'FETCH_THINGS'){
    state = {...state, data: {...stage.data, [action.idx]: action.things}};
  }
  if(action === 'SET_COUNT'){
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
    type: ''
  };
};

const _setCount = (count)=> {
  return {
    type: 'SET_COUNT',
    count
  };
};

const fetchThings = (idx)=> {
  return async(dispatch, getState)=> {
    const things = getState().things.data[idx];
    if(things){
      dispatch(_fetchThings(things))
    }
    else {
      const { things, count } = (await axios.get(`/api/things?idx=${idx}`)).data
      dispatch(_fetchThings({ things, idx }));
      dispatch(_setCount());
    }
  };
};

export { fetchThings };

export default store;

