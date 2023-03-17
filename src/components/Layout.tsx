import Head from "next/head";
import Nav from "./Nav";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="antialiased bg-[#767676] ">
        <Nav />

        <main className="p-8 flex min-h-screen flex-col items-center justify-center ">
          {children}
        </main>

        <footer className="mt-4 text-center">
          &copy; {new Date().getFullYear()} My Next.js App
        </footer>
      </div>
    </>
  );
};

export default Layout;
