import React, { Component } from 'react';

class MoleHole extends Component {

  render(){
    return (
      <div className="game__hole" >
        <div className="game__whack">
          <div className={"game__mole"} onClick={ this.props.onClick }
            style={{WebkitTransform: this.props.context[this.props.holeNumber]}}>
          </div>
          <div className="game__mound"></div>
        </div>
      </div>
    )
  };
}

export default MoleHole;