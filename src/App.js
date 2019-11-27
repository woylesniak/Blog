import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Chosen from './components/Chosen';
import AddComment from './components/AddComent';


export default class App extends Component {
  render() {

    const list = {
      display: 'flex',
      justifyContent: 'flex-end', 
      listStyle: 'none'
    }

    const element = {
      margin: '0 20px',
      color: '#CCC',
    }

    return ( 
      <Router >
        <div>
          <nav>
            <ul style = {list} >
              <li style={element}>
                <Link to = "/" > Home </Link> 
              </li> 
              <li style={element}>
                <Link to = "/chosen" > Chosen </Link> 
              </li> 
              <li style={element}>
                <Link to = "/add-comment" > Add comment </Link> 
              </li> 
            </ul> 
            </nav>

      <Switch >
        <Route path = "/add-comment" >
          <AddComment / >
        </Route> 
        <Route path = "/chosen" >
          <Chosen / >
        </Route> 
        <Route path = "/" >
          <Home />
        </Route> 
      </Switch> 
      </div> 
      </Router>
    );
  }
}