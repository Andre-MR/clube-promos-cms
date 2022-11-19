import Category from "../../models/category";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  categories: Category[];
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterCategory(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Category = e.currentTarget.value;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        value={props.filterParameters.Category}
      >
        <option key={0} value={FilterKeys.None}>
          Categoria
        </option>
        {props.categories.map((category) => {
          return (
            <option key={category.SK} value={category.Description}>
              {category.Description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
