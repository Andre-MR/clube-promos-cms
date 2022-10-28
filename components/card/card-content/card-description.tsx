import Offer from "../../../models/offer";

export default function CardDescription({ offer }: { offer: Offer }) {
  return (
    <div className="mb-2 h-full">
      <p
        className="whitespace-pre-line px-2 text-sm text-gray-900"
        dangerouslySetInnerHTML={{
          __html:
            offer.Description.length < 200
              ? offer.Description
              : `${offer.Description.substring(0, 200)}
        <a href="/">...mais</a>`,
        }}
      >
        {/* {offer.Description.length < 200 ? offer.Description : `${offer.Description.substring(0, 200)} ...mais`} */}
      </p>
    </div>
  );
}
