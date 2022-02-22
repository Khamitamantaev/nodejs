import React from 'react';
import Layout from 'antd/lib/layout';
import Link from 'next/link';
import Menu from 'antd/lib/menu';

const { Header } = Layout;

const styles = {
  menu: {
    lineHeight: '64px',
  },
  logo: {
    fontWeight: 'bold',
    color: '#fff',
  },
};

const DefaultHeader = () => (
  <Header>
    <Menu mode="horizontal" theme="dark" style={styles.menu}>
      <Menu.Item><Link href="/"><a style={styles.logo}>Khammerson App</a></Link></Menu.Item>
      <Menu.Item><Link href="/about"><a>About me</a></Link></Menu.Item>
    </Menu>
  </Header>
);

export default DefaultHeader;
