import React from "react";
import { CompositeDecorator, Editor, EditorState, Modifier } from "draft-js";
import SynonymSelector from './SynonymSelector'
import Menu from './Menu'
import CounterCardFlip from './CounterCardFlip'
import ArcUpRight from './ArcUpRight'
import {dictionary, dictionaryKeys} from '../synonym_dictionary'

export default class TextEditor extends React.Component {
  constructor() {
    super()
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: this.hashtagStrategy,
        component: SynonymSelector,
        props: {
          handleSynonymWordSelection: this.handleSynonymWordSelection,
          incrementFoundWordCount: this.incrementFoundWordCount,
          decrementFoundWordCount: this.decrementFoundWordCount
        }
      }
    ])
    
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
      selectedWord: '',
      isMenuVisible: false,
      isCounterVisible: false,
      foundWordCount: 0,
    }

    this.styles = {
      editor: {
        postion: 'relative',
        // margin: '0 auto',
        // maxWidth: '80%',
        textAlign: 'center',
        height: '40vh',
        borderRadius: '4px',
        border: "1px solid #ddd",
        // cursor: "text",
        // fontSize: 16,
        padding: 10,
        // backgroundColor: '#fff',
        color: '#333',
      },
      counter: {
        color: 'black'
      }
    }
    
    
    this.focus = () => {
      this.styles.editor = {...this.styles.editor, ...{textAlign: 'left'}}
      this.refs.editor.focus()
    }

    this.onChange = editorState => {
      if (editorState.getSelection().isCollapsed() && this.state.selectedWord.length) { //handles when menu not clicked and user re-interacts with editor
        this.setState({editorState, isMenuVisible: false, selectedWord: ''})
      } else {
        this.setState({ editorState })
      }
    }

    this.logState = () => console.log(this.state.editorState.toJS())
    // this.findWithRegex = this.findWithRegex.bind(this)

  }

  hashtagStrategy = (contentBlock, callback, contentState) => {
    this.findWithRegex(HASHTAG_REGEX, contentBlock, callback)
  }
  
  findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    
    dictionaryKeys.map(word => {
      let matchArr, start;
      var regex = new RegExp(word, "gi");

      while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length)
      }
    })
  }

  incrementFoundWordCount = (action) => {
    this.setState((prevState, props) => ({
      foundWordCount: prevState.foundWordCount + 1,
      isCounterVisible: true
    }))
  }

  decrementFoundWordCount = (action) => {
    this.setState((prevState, props) => ({
      foundWordCount: prevState.foundWordCount - 1,
      isCounterVisible: true
    }))
  }

  handleSynonymWordSelection = (e) => {
    this.setState({ 
      selectedWord: e.target.innerText.toLowerCase(),
      isMenuVisible: true
    })
    
    console.log("clicked......", e.target.innerText);
  }

  handleSynonymClick = (e) => {
    this.setState({ isMenuVisible: false })
    
    const selectionState = this.state.editorState.getSelection()

    const contentStateWithReplacedText = Modifier.replaceText(
      this.state.editorState.getCurrentContent(),
      selectionState,
      e.target.innerText,
      null,
      null
    )

    EditorState.forceSelection(this.state.editorState, this.state.editorState.getSelection());

    const editorStateAfterTextAndEntity = EditorState.push(
      this.state.editorState,
      contentStateWithReplacedText,
      'replace-text'
    )
    this.onChange(editorStateAfterTextAndEntity)
  }

  render() {
    return (
      <div>
        <div id='editor' style={this.styles.editor} onClick={this.focus}>

          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Paste text or start typing below..."
            ref="editor"
            spellCheck={true}
            textAlign='align-center'
          />

          {
            (this.state.foundWordCount >= 1 || this.state.isCounterVisible) &&
              <ArcUpRight render={ () => <CounterCardFlip counter={this.state.foundWordCount} /> } />
          }
          


        </div>

        
        
        {
          this.state.isMenuVisible &&
            <Menu 
              synonyms={dictionary[this.state.selectedWord]}
              onClick={this.handleSynonymClick}
            />
        }
      </div>
    );
  }
}
/**
 * Super simple decorators for handles and hashtags, for demonstration
 * purposes only. Don't reuse these regexes.
 */

// const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;
const HASHTAG_REGEX = /long|short+/g;

// function hashtagStrategy(contentBlock, callback, contentState) {
//   this.findWithRegex(HASHTAG_REGEX, contentBlock, callback)
// }

// function findWithRegex(regex, contentBlock, callback) {
//   const text = contentBlock.getText();
//   dictionaryKeys.map(word => {
//     let matchArr, start;
//     var regex = new RegExp(word, "gi");
//     while ((matchArr = regex.exec(text)) !== null) {
//       start = matchArr.index;
//       this.setState((prevState, props) => ({foundWordCount: prevState.foundWordCount + 1}))
//       callback(start, start + matchArr[0].length)
//     }
//   });
// }

// const styles = {
//   editor: {
//     // margin: '0 auto',
//     // maxWidth: '80%',
//     // textAlign: 'left',
//     height: '40vh',
//     borderRadius: '4px',
//     border: "1px solid #ddd",
//     // cursor: "text",
//     // fontSize: 16,
//     padding: 10,
//     // backgroundColor: '#fff',
//     color: '#7F7F7F'
//   }
// };
