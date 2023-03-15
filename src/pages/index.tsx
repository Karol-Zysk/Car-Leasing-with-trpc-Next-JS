import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Toolbar from "@radix-ui/react-toolbar";
import Cars from "../components/Cars";
import AddCar from "../components/AddCar";

function Home() {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  const handleSignOut = () => {
    void signOut();
  };

  const handleSignIn = () => {
    void signIn();
  };

  return (
    <>
      <Head>
        <title>Car Lease Page</title>
        <meta name="description" content="Car Lease Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar.Root>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0f1235] to-[#090920]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            {sessionData && (
              <div className="grid grid-cols-1 w-1/4 gap-4 md:gap-8">
                <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
                  <h3 className="text-xl font-bold">Available Cars</h3>
                  <Cars />
                  <AddCar />
                </div>
              </div>
            )}
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-l text-white">
                  {sessionData && (
                    <span>Logged in as {sessionData.user?.email}</span>
                  )}
                </p>
                <Toolbar.Button
                  onClick={sessionData ? handleSignOut : handleSignIn}
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </Toolbar.Button>
              </div>
            </div>
          </div>
        </main>
      </Toolbar.Root>
    </>
  );
}

export default Home;
