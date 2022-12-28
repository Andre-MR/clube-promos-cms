import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormPriority(props: Props) {
  return (
    <div className="mx-5 flex w-full flex-col space-y-1">
      <label htmlFor="priority">Prioridade</label>
      <select
        className="h-8 rounded py-1 px-1"
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Priority = Number.parseInt(e.currentTarget.value);
          props.defineOfferSelected(newOffer);
        }}
        defaultValue={props.offer.SK ? props.offer.Priority : 1}
      >
        <option value={0}>Alta</option>
        <option value={1}>Padrão</option>
        <option value={2}>Baixa</option>
      </select>
    </div>
  );
}
