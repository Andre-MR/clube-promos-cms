import Link from "next/link";
import Offer from "../../../models/offer";

export default function CardDescription({ offer }: { offer: Offer }) {
  return (
    <div title="descrição" className="mb-2 h-full">
      <p className="whitespace-pre-line px-2 text-sm text-gray-900">
        {offer.Description.length < 200 ? (
          offer.Description
        ) : (
          <>
            {offer.Description.substring(0, 200)}{" "}
            <Link className="italic text-blue-500" href="/">
              (veja mais...)
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
