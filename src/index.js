import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

const root = document.querySelector('#root');

const Home = ()=> (<div><h1>Acme Home</h1></div>);

class Things extends Component{
  constructor(){
    super();
    this.state = {
      things: []
    };
  }
  async componentDidMount(){
    const things = (await axios.get('/api/things')).data;
    this.setState({ things });
  }
  render(){
    const { things } = this.state;
    return (
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id } style={{ backgroundColor: thing.color }}>
                { thing.name }
                <br />
                { thing.price }
              </li>
            );
          })
        }
      </ul>
    );
  }
}


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
