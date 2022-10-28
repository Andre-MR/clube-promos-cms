import Offer from "../../../models/offer";
import CardLogos from "../card-logos/card-logos";
import CardHeader from "../card-header/card-header";
import CardContent from "../card-content/card-content";
import CardFooter from "../card-footer/card-footer";
import Store from "../../../models/store";

type Props = {
  offer: Offer;
  stores: Store[];
};

export default function Card(props: Props) {
  return (
    <div className="relative grid w-full">
      <div className="m-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-white">
        <CardLogos offer={props.offer} stores={props.stores} />
        <CardHeader offer={props.offer} />
        <CardContent offer={props.offer} />
        <CardFooter offer={props.offer} />
      </div>
    </div>
  );
}
