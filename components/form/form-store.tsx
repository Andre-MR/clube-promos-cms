import { RefObject } from "react";
import Offer from "../../models/offer";
import Store from "../../models/store";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  stores: Store[];
  resultRef: RefObject<HTMLSelectElement>;
};

export default function FormStore(props: Props) {
  return (
    <div title="loja" className="mx-5 flex w-full flex-col space-y-1">
      <label htmlFor="priority">Loja</label>
      <select
        ref={props.resultRef}
        className="h-8 rounded py-1 px-1"
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Store = e.currentTarget.value;
          props.defineOfferSelected(newOffer);
        }}
        defaultValue={props.offer.SK ? props.offer.Store : "Lojas Online"}
      >
        {props.stores.map((store) => {
          return (
            <option key={store.SK} value={store.Description}>
              {store.Description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
