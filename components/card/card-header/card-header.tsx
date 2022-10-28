import CardImage from "./card-image";
import CardImageBackground from "./card-image-background";
import Offer from "../../../models/offer";

export default function CardHeader({ offer }: { offer: Offer }) {
  return (
    <div className="relative flex justify-center">
      <CardImage offer={offer} />
      <CardImageBackground />
    </div>
  );
}
