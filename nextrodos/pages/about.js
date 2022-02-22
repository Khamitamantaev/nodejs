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
          <p>My name is Hamit, and this is my first experience with NextJS, for example. I am a novice node js developer. In 2022, I want to get a job. At the moment I have several working projects, including this one, that I would like to demonstrate in order to impress you.
At the moment I use such well-known technologies as:</p>
        <ul>
          <li>Apollo Graphql</li>
          <li>NestJS(NodeJS)</li>
          <li>TypeORM(ORM)</li>
          <li>Prisma(ORM)</li>
          <li>NextJS(ReactJS)</li>
        </ul>
        </div>
      </DefaultLayout>
    );
  }
}

export default About;
