import Offer from "../../models/offer";
import { FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterSearch(props: Props) {
  return (
    <div
      title="pesquisa"
      className="flex w-full rounded border shadow shadow-gray-400"
    >
      <input
        className="flex w-full py-1 px-2 text-sm"
        id="url"
        name="url"
        type="text"
        placeholder="Pesquisar título"
        maxLength={250}
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Title = e.currentTarget.value;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        required
      />
    </div>
  );
}
