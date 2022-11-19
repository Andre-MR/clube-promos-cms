import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterActive(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Active = e.currentTarget.value;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        value={props.filterParameters.Active}
      >
        <option key={1} value={"Ativas"}>
          Ativas
        </option>
        <option key={2} value={"Inativas"}>
          Inativas
        </option>
        <option key={3} value={FilterKeys.None}>
          Todas
        </option>
      </select>
    </div>
  );
}
