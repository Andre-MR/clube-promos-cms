import Offer from "../../../models/offer";

export default function CardButton({ offer }: { offer: Offer }) {
  return (
    <div
      id="card-button-offer"
      className="my-2 flex justify-center text-xs text-gray-700"
    >
      <div
        className="flex h-full w-full items-center space-x-2 px-2" /*target={'_blank'} rel="noreferrer" href={offer.Url}*/
      >
        <div
          className="flex h-full w-full items-center 
                        justify-between rounded border-2 border-dotted border-gray-500"
        >
          <div className="flex w-4/6 justify-center text-sm font-bold text-green-500">
            {offer.Code}
          </div>
          <button
            type="button"
            className="bg-flare-orange animate-flare w-2/6 rounded px-5 py-2 
                    text-center text-xs text-white shadow focus:outline-none focus:ring-4"
            onClick={async () => {
              await navigator.clipboard.writeText(offer.Code);
              window.open(offer.Url, "_blank");
            }}
          >
            <span className="text-white">Copiar e Ir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
