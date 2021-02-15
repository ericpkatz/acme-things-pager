import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

const root = document.querySelector('#root');

const Home = ()=> (<div><h1>Acme Home</h1></div>);
const Things = ()=> (<div><h1>Things</h1></div>);


class App extends Component{
  render(){
    return (
      <HashRouter>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/things'>Things</Link>
        </nav>
        <Route path='/' exact component={ Home }/>
        <Route path='/things' component={ Things }/>
      </HashRouter>
    );
  }
} 



render(<App />, root);
