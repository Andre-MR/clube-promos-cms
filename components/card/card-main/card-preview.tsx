import Offer from "../../../models/offer";
import Store from "../../../models/store";
import FormHeader from "../../form/form-header";
import Card from "./card";

type Props = {
  offer: Offer;
  stores: Store[];
};

export default function CardPreview(props: Props) {
  return (
    <>
      <FormHeader title="Pré-visualização" />
      <div className="shadow-yellow flex justify-center text-fuchsia-900">
        {props.offer.SK}
      </div>

      <div className="flex h-full items-center justify-center px-2">
        <Card offer={props.offer} stores={props.stores} />
      </div>
    </>
  );
}
