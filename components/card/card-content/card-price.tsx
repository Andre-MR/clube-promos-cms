import Offer from "../../../models/offer";

export default function CardPrice({ offer }: { offer: Offer }) {
  return (
    <a
      className="mb-1 flex flex-col justify-between"
      target={"_blank"}
      rel="noreferrer"
      href={offer.Url}
    >
      {offer.OldPrice > 0 ? (
        <div
          id="card-price"
          className="flex items-center justify-center text-gray-500"
        >
          <span className="text-xs line-through drop-shadow-md">R$</span>
          &nbsp;
          <span className="text-base line-through drop-shadow-md">
            {offer.OldPrice.toLocaleString("pt-BR", {
              style: "decimal",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      ) : (
        ""
      )}
      <div
        id="card-price"
        className="animate-wave flex items-center justify-center"
      >
        <span className="text-sm font-semibold drop-shadow-md">R$</span>
        &nbsp;
        <span className="text-4xl font-bold drop-shadow-md">
          {offer.Price.toLocaleString("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </a>
  );
}
