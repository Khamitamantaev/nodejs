import React, { PureComponent } from 'react';
import { DefaultLayout } from '../components/layout';
import Image from 'next/image'

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20%',
    padding: 40,
  }
};



// eslint-disable-next-line react/prefer-stateless-function
class About extends PureComponent {
  render() {
    return (
      <DefaultLayout>
        <div style={styles.wrapper}>
          <div className='text-center'>
          <Image
         
         src="/me.jpg"
         alt="Picture of the author"
         width={250}
         height={250}
      />
          </div>
          <h1 className='text-center mb-3'>My name is Hamit, and this is my first experience with NextJS, for example.</h1>
          <p>I am a novice node js developer. In 2022, I want to get a job. At the moment I have several working projects, including this one, that I would like to demonstrate in order to impress you.
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
