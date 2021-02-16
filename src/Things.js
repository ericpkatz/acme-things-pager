import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchThings } from './store';

class _Things extends Component{
  componentDidUpdate(prevProps){
    if(prevProps.match.params.idx !== this.props.match.params.idx){
      this.props.fetchThings();
    }
  }
  componentDidMount(){
    this.props.fetchThings();
  }
  render(){
    const { things, count } = this.props;
    const pageCount = Math.ceil(count / 200);
    const links = new Array(pageCount).fill('-').map( (_, idx)=> {
      return {
        text: idx + 1,
        idx,
        selected: !this.props.match.params.idx && idx === 0 || this.props.match.params.idx*1 === idx
      };
    });
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

const Things = connect(
  (state, ownProps)=> {
    console.log(state.things.data);
    return {
      count: state.things.count,
      things: state.things.data[ownProps.match.params.idx] || []
    };
  }, 
  (dispatch, ownProps)=> {
    return {
      fetchThings: ()=> dispatch(fetchThings(ownProps.match.params.idx || 0))
    }
  } 
)(_Things);


export default Things;
