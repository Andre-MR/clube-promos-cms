import { Dispatch, SetStateAction } from "react";
import Store from "../../models/store";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  stores: Store[];
  offers: Offer[];
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  filterParameters: FilterParameters;
  setFilterParameters: Dispatch<SetStateAction<FilterParameters>>;
};

export default function ListFilterStore(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      {/* <label htmlFor="priority">Loja</label> */}
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Store = e.currentTarget.value;
          props.setFilterParameters(newFilterParameters);
          props.setOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        defaultValue={FilterKeys.None}
      >
        <option key={0} value={FilterKeys.None}>
          Loja
        </option>
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
