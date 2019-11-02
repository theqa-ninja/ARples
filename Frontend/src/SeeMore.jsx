/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import './SeeMore.css';
import { Button } from 'grommet';
import { setImage, finishRequest } from './actions';

export class SeeMore extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  onSubmit = () => {
    this.props.setImage(
      this.state.selected ? this.props.curr : this.props.image,
    );
  };

  onFinish = () => {
    this.props.finishRequest();
  };

  onClick = (selected) => () => this.setState({ selected });

  render() {
    const { image, curr } = this.props;
    const { selected } = this.state;
    return (
      <div className="SeeMore">
        <h1>Current Image</h1>
        <div>
          <img
            alt="curr"
            src={curr.url}
            height={window.innerHeight / 3}
            className={selected ? 'selected' : ''}
            onClick={this.onClick(true)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {image ? (
          <>
            <h1>Selected Image</h1>
            <div>
              <img
                alt="selected"
                src={image.url}
                height={window.innerHeight / 3}
                className={!selected ? 'selected' : ''}
                onClick={this.onClick(false)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </>
        ) : (
          <>
            <h1>No Image Selected</h1>
            <img
              alt="selected"
              src={curr.url}
              height={window.innerHeight / 3}
              className={!selected ? 'selected' : ''}
              onClick={this.onClick(false)}
              style={{ filter: 'grayscale(100%)' }}
            />
          </>
        )}
        <Button
          onClick={this.onSubmit}
          label="Set"
          style={{ marginTop: '1em' }}
        />
        <Button
          onClick={this.onFinish}
          label="Finish"
          style={{ marginTop: '1em' }}
          disabled={!image}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ image: state.image.image });

export default connect(
  mapStateToProps,
  {
    setImage,
    finishRequest,
  },
)(SeeMore);
