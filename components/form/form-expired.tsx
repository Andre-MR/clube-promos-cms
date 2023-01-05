import Offer from "../../models/offer";
import { DateFormatterUS } from "../../utils/date-formatter";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

function defaultExpired() {
  const newExpired = new Date();
  newExpired.setHours(0, 0, 0, 0);
  newExpired.setDate(newExpired.getDate() + 30);
  return newExpired;
}

export default function FormExpired(props: Props) {
  return (
    <div title="validade" className="mx-5 flex w-full flex-col space-y-1">
      <label htmlFor="expired">Expira em</label>
      <input
        className="h-8 rounded py-1 px-2"
        id="expired"
        name="expired"
        type="date"
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Expired = new Date(e.currentTarget.value);
          props.defineOfferSelected(newOffer);
        }}
        value={
          props.offer.SK
            ? props.offer.Expired.toString().substring(0, 10)
            : props.offer.Expired
            ? DateFormatterUS(props.offer.Expired)
            : ""
        }
      />
    </div>
  );
}
