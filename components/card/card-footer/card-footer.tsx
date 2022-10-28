import Offer from "../../../models/offer";
import DateFormatter from "../../../utils/date-converter-br";

type Props = {
  offer: Offer;
};

export default function CardFooter(props: Props) {
  const updateFormatted = DateFormatter(props.offer.Updated);
  return (
    <div
      id="card-footer"
      className="mt-1 flex items-center justify-between bg-blue-50 px-1 py-1"
    >
      <div className="flex w-6/12">
        <p className="mx-1 fill-current text-xs font-bold text-green-500">
          &#x2713;
        </p>
        <p className="text-xs text-cyan-800">Atualizado: {updateFormatted}</p>
      </div>

      <div className="flex w-6/12 justify-end">
        <div className="flex items-center justify-center space-x-1 rounded-lg px-1 py-1 text-slate-700">
          <svg
            aria-hidden="true"
            height="14px"
            width="14px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              ></path>
            </g>
          </svg>
          <p className="text-xs">{props.offer.Views}</p>
        </div>
      </div>
    </div>
  );
}
