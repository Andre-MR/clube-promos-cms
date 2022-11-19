import { Dispatch, SetStateAction } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  // setOffer: Dispatch<SetStateAction<Offer>>;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormUrl(props: Props) {
  return (
    <div title="line4" className="flex w-full flex-col space-y-1 px-5">
      <label htmlFor="url">URL</label>
      <input
        className="flex h-8 w-full rounded py-1 px-2"
        id="url"
        name="url"
        type="text"
        maxLength={250}
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Url = e.currentTarget.value;
          props.defineOfferSelected(newOffer);
        }}
        required
        defaultValue={props.offer.Url}
      />
    </div>
  );
}
