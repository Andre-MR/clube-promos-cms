import { useState } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormPrice(props: Props) {
  const [priceEditing, setPriceEditing] = useState(false);
  return (
    <div title="preço" className="mx-5 flex w-1/4 flex-col space-y-1">
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
          setPriceEditing(true);
          const newOffer = structuredClone(props.offer);
          newOffer.Price = Number.parseFloat(
            Number.parseFloat(e.currentTarget.value).toFixed(2)
          );
          props.defineOfferSelected(newOffer);
        }}
        onBlur={(e) => {
          setPriceEditing(false);
          const newOffer = structuredClone(props.offer);
          newOffer.Price = Number.parseFloat(
            Number.parseFloat(e.currentTarget.value).toFixed(2)
          );
          props.defineOfferSelected(newOffer);
          e.currentTarget.value = Number.parseFloat(
            e.currentTarget.value
          ).toFixed(2);
        }}
        value={priceEditing ? props.offer.Price : props.offer.Price.toFixed(2)}
      />
    </div>
  );
}
