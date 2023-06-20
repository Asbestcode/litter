import TopBar from "./TopBar.js";
import Head from "next/head.js";

export default function Layout({ children }) {
  return (
    <>
        <Head>
            <title>Litter</title>
        </Head>
        <TopBar />
        <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px"
        }}>
            {children}
        </div>
    </>
  );
}