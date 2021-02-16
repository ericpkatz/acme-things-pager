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
      things: [],
      count: 0
    };
  }
  async fetchPage(){
      const idx = this.props.match.params.idx || 0;
      const { things, count } = (await axios.get(`/api/things?idx=${idx}`)).data;
      this.setState({ things, count });
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.params.idx !== this.props.match.params.idx){
      this.fetchPage();
    }
  }
  componentDidMount(){
    this.fetchPage();
  }
  render(){
    const { things, count } = this.state;
    const pageCount = Math.ceil(count / 200);
    const links = new Array(pageCount).fill('-').map( (_, idx)=> {
      return {
        text: idx + 1,
        idx,
        selected: !this.props.match.params.idx && idx === 0 || this.props.match.params.idx*1 === idx
      };
    });
    console.log(links);
    return (
      <div>
        <h1>{ count } Things</h1>
        <nav>
          {
            links.map( ({ idx, text, selected}) => {
              return (
                <Link key={ idx } to={`/things/${ idx }`} className={ selected? 'selected': ''}>
                  { text }
                </Link>
              );
            })
          }
        </nav>
        <ul>
          {
            things.map( thing => {
              return (
                <li key={ thing.id } style={{ backgroundColor: thing.color, fontWeight: thing.onSale ? 'bold': 'normal' }}>
                  { thing.name }
                  <br />
                  { thing.price }
                </li>
              );
            })
          }
        </ul>
      </div>
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
        <Route path='/things/:idx?' component={ Things }/>
      </HashRouter>
    );
  }
} 



render(<App />, root);
