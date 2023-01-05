import Offer from "../../models/offer";
import Image from "next/image";
import CardLogoStore from "../card/card-logos/card-logo-store";
import Store from "../../models/store";
import { useRouter } from "next/router";
import { DateFormatterBR } from "../../utils/date-formatter";

type Props = {
  itemKey: string;
  offer: Offer;
  stores: Store[];
  offerSelected: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function ListOffersItem(props: Props) {
  const router = useRouter();

  return (
    <>
      <div
        className={
          props.itemKey == props.offerSelected.SK
            ? "flex w-full cursor-pointer justify-between border bg-cyan-50 p-1 shadow-md hover:bg-cyan-50"
            : props.offer.Active
            ? "flex w-full cursor-pointer justify-between border p-1 shadow-md  hover:bg-slate-100"
            : "flex w-full cursor-pointer justify-between border-2 border-dashed border-gray-300 bg-gray-200 p-1 shadow-md hover:bg-slate-50"
        }
        onClick={() => {
          props.defineOfferSelected(props.offer);
        }}
        onDoubleClick={() => {
          props.defineOfferSelected(props.offer);
          router.push({
            pathname: "/ofertas/edicao",
          });
        }}
      >
        <div className="relative ml-2 mr-4 flex h-20 w-20">
          <Image
            className="object-contain"
            key={props.offer.ImageUrl}
            src={props.offer.ImageUrl}
            alt="Offer Image"
            fill
          ></Image>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between whitespace-pre-wrap">
            <p className="font-bold text-gray-700">{props.offer.Title}</p>
            <div className="relative">
              <div className="absolute top-1 right-2">
                <CardLogoStore offer={props.offer} stores={props.stores} />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex w-full flex-col">
              <div className="flex text-lg font-bold text-green-500">
                {props.offer.Price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex justify-between space-x-10">
                <div className="mr-80 flex w-full justify-start space-x-10 text-xs">
                  <div>Cadastro: {DateFormatterBR(props.offer.Created)}</div>
                  <div>Atualização: {DateFormatterBR(props.offer.Updated)}</div>
                  {new Date(props.offer.Expired) < new Date() ? (
                    <div className="text-red-500">
                      Validade:{" "}
                      {props.offer.Expired
                        ? DateFormatterBR(props.offer.Expired)
                        : null}
                    </div>
                  ) : (
                    <div>
                      Validade:{" "}
                      {props.offer.Expired
                        ? DateFormatterBR(props.offer.Expired)
                        : null}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center space-x-4 px-2 text-slate-800">
                  <div className="flex space-x-1">
                    <svg
                      className="fill-slate-500"
                      height="14px"
                      width="14px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z" />
                    </svg>
                    <p className="text-xs">{props.offer.Clicks}</p>
                  </div>
                  <div className="flex space-x-1">
                    <svg
                      className="text-slate-500"
                      aria-hidden="true"
                      height="16px"
                      width="16px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                        ></path>
                      </g>
                    </svg>
                    <p className="text-xs">{props.offer.Views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
