import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DefaultLayout } from '../components/layout';
import Counter from '../components/counter';
import ApiStatus from '../components/api-status';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20%',
    padding: 40,
  },
};

class Home extends PureComponent {
  static propTypes = {
    userAgent: PropTypes.string.isRequired,
  };

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : window.navigator.userAgent; // eslint-disable-line no-undef
    return { userAgent };
  }

  render() {
    const { userAgent } = this.props;
    return (
      <DefaultLayout>
        <div style={styles.wrapper}>
          <h1 className='text-center'>Hello, my dear Employer!</h1>
          <h1 className='text-center'>This is one of the test pages of my portfolio</h1>
        </div>
      </DefaultLayout>
    );
  }
}

export default Home;
