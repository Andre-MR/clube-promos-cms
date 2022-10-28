import Offer from "../../../models/offer";

export default function CardOffer({ offer }: { offer: Offer }) {
  if (offer.Title.indexOf("*") >= 0) {
    offer.Title = offer.Title.substring(1, offer.Title.length);
  }
  if (
    offer.Title.substring(offer.Title.length - 1, offer.Title.length) == "*"
  ) {
    offer.Title = offer.Title.substring(0, offer.Title.length - 1);
  }
  return (
    <div className="flex flex-col items-center px-2">
      <a
        className="flex h-full flex-col justify-between"
        target={"_blank"}
        rel="noreferrer"
        href={offer.Url}
      >
        <h2 className="whitespace-pre-wrap text-center text-lg font-bold text-black">
          {offer.Title}
        </h2>
      </a>
    </div>
  );
}
