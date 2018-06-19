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
            <h2>Find active word alternatives</h2>
          </header>
          <div className="intro">
            <p style={{'marginBottom': '4px'}}>Missing the right active words for your cover letter or resume?</p>
            <p style={{'marginTop': '0px'}}>
              Make sure you are not using the most common passive words.<br />
              Improve your <b>cover letter</b> or <b>resume</b> with this free tool.<br />
              Type or paste text into the editor below and we'll check for passive words that recruiters and employers hate to see.
            </p>
          </div>
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
