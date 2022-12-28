import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormTitle(props: Props) {
  return (
    <div title="título" className="flex w-full flex-col space-y-1 px-5">
      <label htmlFor="title">Título</label>
      <input
        className="flex h-8 w-full rounded py-1 px-2"
        id="title"
        name="title"
        type="text"
        maxLength={250}
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Title = e.currentTarget.value;
          props.defineOfferSelected(newOffer);
        }}
        required
        value={props.offer.Title}
      />
    </div>
  );
}
