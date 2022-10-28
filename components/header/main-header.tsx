import Link from "next/link";
import router from "next/router";
import { useState } from "react";

const hamburgerStyles = {
  open: {
    navLinks: "h-48",
    hamburgerLines: "translate-x-10",
    crossGroup: "translate-x-0",
    crossLine1: "rotate-45",
    crossLine2: "-rotate-45",
  },
  closed: {
    navLinks: "h-0",
    hamburgerLines: "",
    crossGroup: "-translate-x-10",
    crossLine1: "rotate-0",
    crossLine2: "-rotate-0",
  },
};

export default function MainHeader() {
  const [hamburgerStyle, setHamburgerStyle] = useState(hamburgerStyles.closed);
  const hamburgerClick = () => {
    if (hamburgerStyle.navLinks == hamburgerStyles.open.navLinks) {
      setHamburgerStyle(hamburgerStyles.closed);
    } else {
      setHamburgerStyle(hamburgerStyles.open);
    }
  };

  return (
    <nav className="sticky top-0 z-30 m-auto flex w-full items-center justify-between bg-fuchsia-900">
      <div className="relative flex w-full flex-wrap items-center justify-between">
        <div className="relative z-10 flex w-full items-center justify-between p-1">
          <div className="flex">
            <button
              className="ml-2 flex items-center text-white"
              onClick={() => {
                router.back();
              }}
            >
              <svg
                className="flex fill-white"
                width={15}
                height={15}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <p className="pl-1">Voltar</p>
            </button>
          </div>

          <h1 className="text-xl text-white">CMS Clube Promos Beta</h1>

          <button className="group relative mx-2 flex" onClick={hamburgerClick}>
            <div className="relative m-1 flex h-[35px] w-[35px] items-center justify-center overflow-hidden transition-all duration-200">
              <div className="flex h-1/2 w-2/3 origin-center transform flex-col justify-between overflow-hidden transition-all duration-200">
                <div
                  className={`h-[2px] w-full origin-left transform bg-gray-100 transition-all duration-200 ${hamburgerStyle.hamburgerLines}`}
                ></div>
                <div
                  className={`h-[2px] w-full transform rounded bg-gray-100 transition-all duration-200 ${hamburgerStyle.hamburgerLines} delay-75`}
                ></div>
                <div
                  className={`h-[2px] w-full origin-left transform bg-gray-100 transition-all duration-200 ${hamburgerStyle.hamburgerLines} delay-150`}
                ></div>

                <div
                  className={`absolute top-2.5 transform items-center justify-between transition-all duration-200 ${hamburgerStyle.crossGroup} flex w-0 group-focus:w-12`}
                >
                  <div
                    className={`absolute h-[2px] w-5 transform bg-gray-100 transition-all duration-200 ${hamburgerStyle.crossLine1} delay-300`}
                  ></div>
                  <div
                    className={`absolute h-[2px] w-5 transform bg-gray-100 transition-all duration-200 ${hamburgerStyle.crossLine2} delay-300`}
                  ></div>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div
          id="navlinks"
          className={`absolute top-10 right-0 z-30 mt-2 w-1/6 overflow-hidden overflow-x-hidden 
          rounded-l bg-white shadow-xl transition-all duration-200 ease-in-out ${hamburgerStyle.navLinks}`}
        >
          <ul className="py-4 px-5 text-left text-lg tracking-wide text-gray-600">
            <li className="block w-full py-3 hover:text-blue-500">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="block w-full py-3 hover:text-blue-500">
              <Link href={"/ofertas/nova"}>Nova Oferta</Link>
            </li>
            <li className="block w-full py-3 hover:text-blue-500">
              <Link href={"/ofertas/listagem"}>Lista de Ofertas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
