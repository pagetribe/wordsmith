import React from "react";
import { CompositeDecorator, Editor, EditorState, Modifier } from "draft-js";
import SynonymSelector from './SynonymSelector'
import Menu from './Menu'
// import '../menu.css'

const dictionary = {
  made: ["created", "produced", "devised", "designed", "established"],
  gave: ["provided", "supplied", "presented"]
};

const dictionaryKeys = Object.keys(dictionary);

export default class TextEditor extends React.Component {
  constructor() {
    super()
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: hashtagStrategy,
        component: SynonymSelector,
        props: {
          handleSynonymWordSelection: this.handleSynonymWordSelection
        }
      }
    ])
    
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
      selectedWord: '',
      isMenuVisible: false
    }
    
    this.focus = () => this.refs.editor.focus()

    this.onChange = editorState => {
      if (editorState.getSelection().isCollapsed() && this.state.selectedWord.length) { //handles when menu not clicked and user re-interacts with editor
        this.setState({editorState, isMenuVisible: false, selectedWord: ''})
      } else {
        this.setState({ editorState })
      }
    }

    this.logState = () => console.log(this.state.editorState.toJS())
  }

  handleSynonymWordSelection = (e) => {
    this.setState({ 
      selectedWord: e.target.innerText,
      isMenuVisible: true
    })
    
    console.log("clicked......", e.target.innerText);
  }

  handleSynonymClick = (e) => {
    console.log(this)
    console.log('yah: ', e.target.innerText)
    
    this.setState({isMenuVisible: false})
    
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
      <div style={styles.root}>
        <div id='editor' style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Write a something..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        
        {
          this.state.isMenuVisible &&
            <Menu 
              synonyms={dictionary[this.state.selectedWord]}
              onClick={this.handleSynonymClick}
            />
        }
        

        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
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

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  dictionaryKeys.map(word => {
    let matchArr, start;
    var regex = new RegExp(word, "gi");
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  });
}

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600
  },
  editor: {
    'margin-top': '100px',
    border: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    minHeight: 40,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  }
};
