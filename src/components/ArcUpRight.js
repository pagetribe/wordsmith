import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    transition: transform 0.4s ease;
    position: relative;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`

const Content = styled.div`
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    position: relative;
    top: 50%;
    left: 50%;
    border-radius: 50%;  
    transition: transform 0.6s;    
`

export default class AcrUpRight extends React.Component {
  constructor(props) {
    super(props)
    this.wrapper =  React.createRef()
    this.content =  React.createRef()
  }

  componentDidMount() {
    let wrapper = this.wrapper.current
    let content = this.content.current
    let container = wrapper.parentElement
    setAnimation()
    
    function setAnimation(e) {
        let targetYPosition = (container.getBoundingClientRect().height + content.getBoundingClientRect().height ) / 2
        content.style.transform = `translateY(-${targetYPosition}px)`
  
        let targetXPosition = container.getBoundingClientRect().width / 2 - content.getBoundingClientRect().width
        wrapper.style.transform = `translateX(${targetXPosition}px)`
    }
  }

  render() {
    return (
      <Wrapper innerRef={this.wrapper}>
        <Content innerRef={this.content}>
          {this.props.render()}
        </Content>
      </Wrapper>
    )
  }
}