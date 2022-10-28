import type { NextPage } from "next";
import Head from "next/head";
import MainHeader from "../components/header/main-header";
import MainFooter from "../components/footer/main-footer";
import Link from "next/link";
import { useState } from "react";
import LoadingIcon from "../components/buttons/loading-icon";

const Home: NextPage = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="h-screen">
      <Head>
        <title>Clube Promos CMS Beta</title>
        <meta name="description" content="Clube Promos CMS Versão Beta" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex h-full w-full flex-col items-center">
        <MainHeader />
        <div className="flex h-full flex-col justify-center space-y-10">
          <Link href={"/ofertas/nova"}>
            <a
              className="flex justify-center rounded border-2 border-green-500 px-4 py-1 text-lg text-green-500 hover:bg-green-50"
              onClick={() => {
                setLoading(true);
              }}
            >
              Nova Oferta
            </a>
          </Link>
          <Link
            href={{
              pathname: "/ofertas/listagem",
            }}
          >
            <a
              className="flex justify-center rounded border-2 border-blue-500 py-1 text-lg text-blue-500 hover:bg-blue-50"
              onClick={() => {
                setLoading(true);
              }}
            >
              Listar Ofertas
            </a>
          </Link>
          {loading ? (
            <div className="flex h-10 items-center justify-center">
              <LoadingIcon />
            </div>
          ) : (
            <div className="flex h-10 items-center justify-center"></div>
          )}
        </div>
        <div className="h-[4%] w-full">
          <MainFooter />
        </div>
      </main>
    </div>
  );
};

export default Home;
