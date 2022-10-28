import { Dispatch, SetStateAction, useEffect } from "react";
import Offer from "../../models/offer";
import Store from "../../models/store";
import ListOffersItem from "./list-offers-item";

type Props = {
  offers: Offer[];
  stores: Store[];
  offerSelected: Offer;
  setOfferSelected: Dispatch<SetStateAction<Offer>>;
};

export default function ListOffersResult(props: Props) {
  return props.offers ? (
    <div className="h-full space-y-2 overflow-y-auto">
      {props.offers.map((offer) => {
        return (
          <ListOffersItem
            key={offer.SK}
            itemKey={offer.SK}
            offer={offer}
            stores={props.stores}
            offerSelected={props.offerSelected}
            setOfferSelected={props.setOfferSelected}
          />
        );
      })}
    </div>
  ) : null;
}
