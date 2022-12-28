import Category from "../../models/category";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  categories: Category[];
};

export default function FormCategories(props: Props) {
  return (
    <div
      title="categoria"
      className="mx-5 flex h-full w-full flex-col space-y-1"
    >
      <label htmlFor="priority">Categoria</label>
      <select
        className="h-full rounded py-1 px-1"
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Category = e.target.value;
          props.defineOfferSelected(newOffer);
        }}
        defaultValue={props.offer.SK ? props.offer.Category : ""}
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
