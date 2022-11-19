import Store from "../../models/store";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  stores: Store[];
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterStore(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Store = e.currentTarget.value;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        value={props.filterParameters.Store}
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
