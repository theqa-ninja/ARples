/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import './SeeMore.css';
import { Button } from 'grommet';
import { setImage } from './actions';

export class SeeMore extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  onSubmit = (id) => {
    this.props.setImage(id);
  };

  onClick = (selected) => () => this.setState({ selected });

  render() {
    const { curr: image } = this.props;
    const { selected } = this.state;
    return (
      <div className="SeeMore">
        <h1>Current Image</h1>
        <div>
          <img
            alt="curr"
            src={image}
            height={window.innerHeight / 3}
            className={selected ? 'selected' : ''}
            onClick={this.onClick(true)}
          />
        </div>
        <h1>Selected Image</h1>
        <div>
          <img
            alt="curr"
            src={image}
            height={window.innerHeight / 3}
            className={!selected ? 'selected' : ''}
            onClick={this.onClick(false)}
          />
        </div>
        <Button label="Set (submits at end)" style={{ marginTop: '1em' }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  {
    setImage,
  },
)(SeeMore);
