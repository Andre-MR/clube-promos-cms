import {
  createRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Offer from "../../models/offer";
import Store from "../../models/store";
import ListOffersItem from "./list-offers-item";

type Props = {
  scrollY: number;
  defineScrollY: (y: number) => void;
  offers: Offer[];
  setOffers: Dispatch<SetStateAction<Offer[]>>;
  stores: Store[];
  setStores: Dispatch<SetStateAction<Store[]>>;
  offerSelected: Offer | null;
  defineOfferSelected: (offer: Offer) => void;
};

export default function ListOffersResult(this: any, props: Props) {
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    resultRef.current?.scrollTo(0, props.scrollY);
  });

  return props.offers ? (
    <div
      ref={resultRef}
      className="h-full space-y-2 overflow-y-auto"
      onScroll={(e) => {
        props.defineScrollY(
          Number.parseInt(e.currentTarget.scrollTop.toString())
        );
      }}
    >
      {props.offers.map((offer) => {
        return (
          <ListOffersItem
            key={offer.SK}
            itemKey={offer.SK}
            offer={offer}
            stores={props.stores}
            offerSelected={props.offerSelected!}
            defineOfferSelected={props.defineOfferSelected}
          />
        );
      })}
    </div>
  ) : null;
}
