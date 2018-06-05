import React from "react";
import ReactDOM from "react-dom";
import { dictionary } from "../synonym_dictionary";

export default class Menu extends React.Component {
  constructor() {
    super();
    this.menu = React.createRef();
  }

  componentDidMount() {
    this.updateAbsolutePosition()
  }

  updateAbsolutePosition = () => {
    const menu = this.menu.current
    console.log("before: ", menu.style)
    if (!menu) return

    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`
    
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`

    menu.style.visibility = 'visible';
    menu.style.transform = 'translateY(-30%) scale(1)';
    menu.style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';

    console.log("after: ", menu.style)
  }

  renderButton(synonym) {
    return (
      <span style={styles.button} onClick={this.props.onClick}>
        {synonym}
      </span>
    );
  }

  render() {
    const root = window.document.getElementById("root");

    return ReactDOM.createPortal(
      <div className='arrow-down' style={styles.hover_menu} ref={this.menu}>
        {this.props.synonyms.map(synonym => this.renderButton(synonym))}
      </div>,
      root
    );
  }
}

const styles = {
  button: {
    color: "#888",
    cursor: "pointer",
    marginLeft: "5px"
  },
  // hover_menu: {
  //   padding: "8px 7px 6px",
  //   position: "absolute",
  //   zIndex: "1",
  //   top: "-10000px",
  //   left: "-10000px",
  //   marginTop: "-6px",
  //   opacity: "0",
  //   backgroundColor: "#222",
  //   borderRadius: "4px",
  //   transition: "opacity 0.75s"
  // },
  hover_menu: {
    "left": "30%", 
    "padding": '6px 8px 8px 5px',
    "transform": "translateY(-30%) scale(0)",
    "position": "absolute",
    "border": "1px solid #ddd",
    "background": "#fff",
    "borderRadius": "5px",
    "boxShadow": "0px 1px 3px 0px rgba(220,220,220,1)",
    "zIndex": "2", "boxSizing": "border-box"
  }
};
