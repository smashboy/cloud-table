import React from 'react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';

import { makeStore } from '../redux/store';

// import MenuAppBar from '../components/MenuApp/MenuAppBar';
// import theme from '../themes/theme';

// const generateClasssName = createGenerateClassName({
//   productionPrefix: 'books-app'
// });

interface Props {
  store: Store
}

class AppContainer extends App<Props> {

  static async getInitialProps ({ Component, ctx }: AppContext) {
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS. 
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {

    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Cloud Table</title>
        </Head>
        <ReduxProvider store={store}>
        {/* <ThemeProvider theme={theme}> */}
          <StylesProvider>
            <CssBaseline />
            {/* <MenuAppBar /> */}
              <Component {...pageProps} />
          </StylesProvider>
        {/* </ThemeProvider> */}
        </ReduxProvider>
      </React.Fragment>
    )
  }
}

export default withRedux(makeStore, {debug: true})(AppContainer);