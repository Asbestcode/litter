import { SessionProvider } from "next-auth/react"
import Layout from "../components/OLD-Layout"
import '../styles/globals.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </SessionProvider>
  )
}
