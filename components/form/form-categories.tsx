import { Dispatch, SetStateAction } from "react";
import Category from "../../models/category";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
  categories: Category[];
};

export default function FormCategories(props: Props) {
  return (
    <div className="mx-5 flex h-full w-full flex-col space-y-1">
      <label htmlFor="priority">Categoria</label>
      <select
        className="h-full rounded py-1 px-1"
        defaultValue={props.offer.Category}
      >
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
