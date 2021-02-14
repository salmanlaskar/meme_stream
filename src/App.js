import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import Post from './components/Post';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={Post} />
      </Router>
  );
}

export default App;
