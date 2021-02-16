import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import store, { fetchThings } from './store';
import { Provider, connect } from 'react-redux';
import Things from './Things';

const root = document.querySelector('#root');

const Home = ()=> (<div><h1>Acme Home</h1></div>);




class _App extends Component{
  componentDidMount(){
    this.props.fetchThings()
  }
  render(){
    return (
      <HashRouter>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/things'>Things ({ this.props.count })</Link>
        </nav>
        <Route path='/' exact component={ Home }/>
        <Route path='/things/:idx?' component={ Things }/>
      </HashRouter>
    );
  }
} 

const App = connect(
  (state)=> {
    return {
      count: state.things.count
    };
  }, 
  (dispatch)=> {
    return {
      fetchThings: ()=> dispatch(fetchThings(0))
    }
  } 
)(_App);



render(<Provider store={ store }><App /></Provider>, root);
