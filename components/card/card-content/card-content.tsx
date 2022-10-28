import Offer from "../../../models/offer";
import CardDescription from "./card-description";
import CardPrice from "./card-price";
import CardDisclaimer from "./card-disclaimer";
import CardTitle from "./card-title";
import CardButton from "./card-button";

export default function CardContent({ offer }: { offer: Offer }) {
  return (
    <div className="flex h-full flex-col">
      <hr className="mb-1 border-gray-300 " />
      <CardPrice offer={offer} />
      <CardTitle offer={offer} />
      {offer.Code ? <CardButton offer={offer} /> : null}
      <hr className="my-1 border-gray-300 " />
      <CardDescription offer={offer} />
      <CardDisclaimer />
    </div>
  );
}
