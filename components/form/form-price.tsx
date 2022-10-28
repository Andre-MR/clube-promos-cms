import { Dispatch, SetStateAction } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
};

export default function FormPrice(props: Props) {
  return (
    <div className="mx-5 flex w-1/4 flex-col space-y-1">
      <label className="flex items-center" htmlFor="price">
        Preço
      </label>
      <input
        className="h-8 rounded py-1 px-2"
        id="price"
        name="price"
        type="number"
        min={0}
        max={999999}
        step={0.01}
        required
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Price = Number.parseFloat(e.currentTarget.value);
          props.setOffer(newOffer);
        }}
        onBlur={(e) => {
          e.currentTarget.value = Number.parseFloat(
            e.currentTarget.value
          ).toFixed(2);
        }}
        defaultValue={props.offer.Price.toFixed(2)}
      />
    </div>
  );
}
