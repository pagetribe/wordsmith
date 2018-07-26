import React from "react"
import selectText from '../utils/selectText'

export default class SynonymSelector extends React.Component {
  constructor() {
    super()
    this.state = { word: "" }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({ word: this.props.decoratedText })
    this.props.incrementFoundWordCount()
  }

  componentWillUnmount() {
    this.props.decrementFoundWordCount()
  }

  handleClick = e => {
    selectText(e.target)
    this.props.handleSynonymWordSelection(e)
    console.log(this.state.word)
  }

  render() {
    return (
        <span
          style={styles.synonymMatch}
          data-offset-key={this.props.offsetKey}
          onClick={this.handleClick}
        >
          {this.props.children}
        </span>
    );
  }
}


const styles = {
  synonymMatch: {
    cursor: 'pointer',
    color: '#bd081c',
    textDecoration: 'underline'
  }
};