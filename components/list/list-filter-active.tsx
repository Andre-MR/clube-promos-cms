import { Dispatch, SetStateAction } from "react";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  offers: Offer[];
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  filterParameters: FilterParameters;
  setFilterParameters: Dispatch<SetStateAction<FilterParameters>>;
};

export default function ListFilterActive(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Active = e.currentTarget.value;
          props.setFilterParameters(newFilterParameters);
          props.setOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        defaultValue={FilterKeys.None}
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
