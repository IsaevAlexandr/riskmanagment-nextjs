import * as React from 'react';
import Head from 'next/head';
import { AppContext, AppProps as NextAppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getSession, Provider as SessionProvider } from 'next-auth/client';

import theme from '../src/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { NOT_AUTH_ROUTES } from '../constants';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={props.pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  try {
    const session = await getSession({ req: context.ctx.req });

    // not auth redirect condition
    if (!session && !Object.values(NOT_AUTH_ROUTES).includes(context.ctx.pathname)) {
      // we are on server
      if (context.ctx.res) {
        context.ctx.res.writeHead(302, { Location: '/login' });
        context.ctx.res.end();
      } else {
        context.router.push('/login', '/login');
      }
    }

    let pageProps = {};

    if (context.Component?.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return { pageProps: { ...pageProps, session } };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // TODO: тут нужно сделать страницу с ошибкой
    context.router.push('/errorpage');
  }
};
