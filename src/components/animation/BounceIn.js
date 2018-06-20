import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounceInKeyframes = keyframes`
  0%{
    opacity: 0;
    transform: scale(0.3) translate3d(0,0,0);
  }
  30%{
    opacity: 0.5;
    transform: scale(0.8);
  }
  50%{
    opacity: 0.8;
    transform: scale(1.3);
  }
  60%{
    opacity: 0.9;
    transform: scale(1.1);
  }
  80%{
    opacity: 1;
    transform: scale(0.9);
  }
  100%{
    opacity: 1;
    transform: scale(1) translate3d(0,0,0);
  }
`

const BounceInAnimation = styled.div`
  ${props => props.animate &&
  `animation : ${bounceInKeyframes } 1000ms cubic-bezier(0.28, 0.84, 0.42, 1) both;`
  })
`

export default class BounceIn extends React.Component {
  state = {
    animate: false
  };

  duration = 500

  componentWillReceiveProps(previousProps, previousState) {
    if (previousProps.watchForChange !== this.props.watchForChange) { //make sure prop has changed
      this.setState({ animate: true });
      setTimeout(() => { //remove the class once finished animating
        this.setState({ animate: false });
      }, this.duration);
    }
  }

  render() {
    return (
      <BounceInAnimation animate={this.state.animate}>
        <div>{this.props.render()}</div>
      </BounceInAnimation>
    );
  }
}