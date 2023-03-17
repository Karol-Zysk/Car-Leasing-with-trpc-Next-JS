import Head from "next/head";
import Cars from "../components/Cars";

function Home() {
  return (
    <>
      <Head>
        <title>Car Lease Page</title>
        <meta name="description" content="Car Lease Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex  items-center justify-between gap-12 px-4 py-16 ">
        <div className="flex flex-col gap-4 rounded-xl  p-4 ">
          <h3 className="text-xl font-bold">Available Cars</h3>
          <Cars />
        </div>
        <div className="flex flex-col gap-4 rounded-xl  p-4 ">
          <h3 className="text-xl font-bold">Available Cars</h3>
          <Cars />
        </div>
      </div>
    </>
  );
}

export default Home;
