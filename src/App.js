import React, { Component } from 'react';
import './App.css';
import TextEditor from './components/TextEditor'
import pasteDemoGif from './pastedemo.gif'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className='colour-panel'>
          <header>
            <h1><span id='cursor'>I</span> Suggester.</h1>
            <h2>Find active word alternatives</h2>
            <div className="paste-demo-gif">
              <img src={pasteDemoGif} alt="Demo of app usage" />
            </div>
          </header>
          <div className="intro">
            <p>Missing the right active words for your cover letter or resume?</p>
            <p>Make sure you are not using the most common passive words an improve your <b>cover letter</b> or <b>resume</b> with this free tool.</p>
            <p>Type or paste text into the editor below and we'll check for passive words that recruiters and employers hate to see.</p>
            <p>Get started now by pasting text or typing in the editor box below.</p>
          </div>
        
        <div className='editor'>
          <TextEditor />
        </div>
        </div>
        <div className="social">
          <div className='twitter'>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
          <div className='linkedin'>
            <script type="IN/Share" data-url="https://pagetribe.github.io/wordsmith/"></script>
          </div>
          <div className='facebook'>
              <div className="fb-like" data-href="https://pagetribe.github.io/wordsmith/" data-layout="button" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
