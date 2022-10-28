import { Dispatch, SetStateAction } from "react";
import Category from "../../models/category";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  categories: Category[];
  offers: Offer[];
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  filterParameters: FilterParameters;
  setFilterParameters: Dispatch<SetStateAction<FilterParameters>>;
};

export default function ListFilterCategory(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      {/* <label htmlFor="priority">Loja</label> */}
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Category = e.currentTarget.value;
          props.setFilterParameters(newFilterParameters);
          props.setOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        defaultValue={FilterKeys.None}
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
