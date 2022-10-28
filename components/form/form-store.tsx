import { Dispatch, SetStateAction } from "react";
import Offer from "../../models/offer";
import Store from "../../models/store";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
  stores: Store[];
};

export default function FormStore(props: Props) {
  return (
    <div className="mx-5 flex flex-col space-y-1">
      <label htmlFor="priority">Loja</label>
      <select
        className="h-8 rounded py-1 px-1"
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Store = e.target.value;
          props.setOffer(newOffer);
        }}
        defaultValue={props.offer.SK ? props.offer.Store : "Amazon"}
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
