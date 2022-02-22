import React, { PureComponent } from 'react';
import { DefaultLayout } from '../components/layout';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20%',
    padding: 40,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class About extends PureComponent {
  render() {
    return (
      <DefaultLayout>
        <div style={styles.wrapper}>
          <h1>This page about me.</h1>
          <h1>My name is Khamit Amantaev Khalitovich!</h1>
        </div>
      </DefaultLayout>
    );
  }
}

export default About;
