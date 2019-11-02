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
    // const { roundId } = new URLSearchParams(window.location.search).get(
    //   'roundId',
    // );

    const roundId = window.location.search.split('=')[1];
    this.props.roundRequest(roundId);
  }

  render() {
    const { finished, roundsLoading, round } = this.props;

    return (
      <div>
        {!roundsLoading && round !== undefined && (
          <>
            {!finished ? (
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
            ) : (
              <div
                style={{
                  height: '100vh',
                  backgroundColor: '#232c39',
                  backgroundImage:
                    'linear-gradient(0deg,rgb(255, 244, 227) 10%,rgb(245, 178, 178))',
                  fontSize: '3em',
                  strokeWidth: 'bold',
                  verticalAlign: 'center',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div>
                  You have successfully judged a photo!
                  <br />
                  <br />
                  You may now close this view.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roundsLoading: state.rounds.loading,
  round: state.rounds.round,
  finished: state.rounds.finished,
});

export default connect(
  mapStateToProps,
  {
    roundRequest,
  },
)(App);

// export default App;
