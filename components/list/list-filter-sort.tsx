import Offer from "../../models/offer";
import { FilterOffers } from "../../utils/offers-sorter-filter";
import { FilterParameters, SortKeys } from "../../models/filter-parameters";

type Props = {
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterSort(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          e.preventDefault();
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Sort = e.currentTarget.value as SortKeys;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        value={props.filterParameters.Sort}
      >
        <option key={1} value={SortKeys.Updated}>
          Atualização
        </option>
        <option key={2} value={SortKeys.Created}>
          Cadastro
        </option>
        <option key={3} value={SortKeys.Expired}>
          Validade
        </option>
      </select>
    </div>
  );
}
