import Offer from "../../../models/offer";
import Store from "../../../models/store";

type Props = {
  offer: Offer;
  stores: Store[];
};

export default function CardLogoStore(props: Props) {
  let storeColor = "black";
  for (const store of props.stores) {
    if (store.Description == props.offer.Store) {
      storeColor = store.Color;
      break;
    }
  }

  const storeStyle = {
    borderColor: storeColor,
    color: storeColor,
  };

  return (
    <div
      className={`z-20 flex whitespace-nowrap rounded-full border bg-white px-2 pb-[0.1rem] text-xs font-bold tracking-wide text-slate-800 opacity-90`}
      style={storeStyle}
    >
      {props.offer.Store ? props.offer.Store : "Loja"}
    </div>
  );
}
