import React from 'react';
import { Grommet } from 'grommet';
import Stories from 'react-insta-stories';
import { connect } from 'react-redux';
import './App.css';
import SeeMore from './SeeMore';
import { roundRequest } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.roundRequest(1);
  }

  render() {
    const { roundsLoading, round } = this.props;

    return (
      <div>
        {!roundsLoading && round !== undefined && (
          <Grommet plain>
            <Stories
              stories={Object.values(round.images).map((image) => ({
                url: image.url,
                seeMore: <SeeMore curr={image} />,
                header: {
                  heading: 'Mohit Karekar',
                  subheading: 'Posted 5h ago',
                  profileImage: 'https://picsum.photos/1000/1000',
                },
              }))}
              defaultInterval={3000}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </Grommet>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roundsLoading: state.rounds.loading,
  round: state.rounds.round,
});

export default connect(
  mapStateToProps,
  {
    roundRequest,
  },
)(App);

// export default App;
