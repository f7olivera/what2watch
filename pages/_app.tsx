import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "@fontsource/karla";
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import React from "react";

const theme = extendTheme({
  colors: {
    // dark: "#040F0F",
    // dark: "#040F0F",
    // green: "#299639",
    darkBorder: "#252525",
    accent: "#33ca58",
    background: "#000",
    storm: "#626262",
    evening: "#282828",
    whiteish: "#FCFFFC",
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "background",
        color: "whiteish",
      },
    },
  },
  fonts: {
    heading: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    body: "Karla",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 2 hours
      staleTime: 7200000,
    },
  },
})

interface Props extends AppProps {
  session: Session
}

function App({ Component, session, pageProps }: Props) {

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
