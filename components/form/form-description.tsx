import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormDescription(props: Props) {
  return (
    <div title="descrição" className="flex h-full flex-col space-y-1 px-5">
      <label htmlFor="description">Descrição</label>
      <textarea
        className="flex h-full w-full resize-none rounded py-1 px-2"
        id="description"
        name="description"
        maxLength={1000}
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Description = e.currentTarget.value;
          props.defineOfferSelected(newOffer);
        }}
        value={props.offer.Description}
      />
    </div>
  );
}
