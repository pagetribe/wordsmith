import React, { Component } from 'react';
import './App.css';
import TextEditor from './components/TextEditor'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className='colour-panel'>
          <header>
            <h1><span id='cursor'>I</span> Suggester.</h1>
            <h2>The fix for passive words</h2>
          </header>
          <p className="intro">
            <p style={{'marginBottom': '4px'}}>Smart way to check you're using active language.</p>
            <p style={{'marginTop': '0px'}}>Improve your cover letter or resume with this free tool.</p>
          </p>
        </div>
        <div className='editor'>
          <TextEditor />
        </div>
        <div className="center-div">
        
        </div>
      </div>
    );
  }
}

export default App;
