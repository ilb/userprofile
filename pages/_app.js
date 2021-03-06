import React from 'react';
import App from 'next/app';
import { ErrorMessage } from '../client/components/ErrorMessage';

import 'semantic-ui-offline/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { Container } from 'semantic-ui-react';
//import '../.semantic/dist/semantic.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const error = pageProps.error;
    return (
      <Container className="container">
        <ErrorMessage error={error} />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
