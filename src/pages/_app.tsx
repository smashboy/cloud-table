import React from 'react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
import { Provider as ReduxProvider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
import { Store } from 'redux';

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
            {/* <Grid container direction='row' justify='center' alignItems='center'> */}
              <Component {...pageProps} />
            {/* </Grid> */}
          </StylesProvider>
        {/* </ThemeProvider> */}
        </ReduxProvider>
      </React.Fragment>
    )
  }
}

export default withRedux(makeStore, {debug: true})(AppContainer);