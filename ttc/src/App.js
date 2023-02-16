import React from 'react';
import './App.css';

import ColdEmails from './components/ColdEmails';
import Home from './components/Home';
import Navigation from './components/navigation';
import ProductDescription from './components/ProductDescription';
import Tweets from './components/Tweets';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
          <Routes>
            <Route path="/" exact element= {<Home/>}/>
            <Route path="/products-description" exact element= {<ProductDescription/>} />
            <Route path="/cold-emails" exact element= {<ColdEmails/>} />
            <Route path="/products-description" exact element= {<ProductDescription/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
