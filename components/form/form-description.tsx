import { useEffect, useState } from "react";
import Offer from "../../models/offer";
import Setting from "../../models/setting";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  descriptions: Array<string>;
  cmsSettings: Setting[];
};

export default function FormDescription(props: Props) {
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  useEffect(() => {
    setDescriptionIndex(0);
  }, [props.descriptions]);

  async function changeDescription() {
    const newIndex =
      descriptionIndex >= props.descriptions.length - 1
        ? 0
        : descriptionIndex + 1;
    const newOffer = structuredClone(props.offer);
    newOffer.Description = props.descriptions[newIndex];
    for (const setting of props.cmsSettings) {
      if (setting.SK == "AMAZON#DESCRIPTION#RECURRENCE") {
        if (props.offer.Description.includes(setting.Value)) {
          newOffer.Description = setting.Value + props.descriptions[newIndex];
        }
        break;
      }
    }
    props.defineOfferSelected(newOffer);
    setDescriptionIndex(
      descriptionIndex >= props.descriptions.length - 1
        ? 0
        : descriptionIndex + 1
    );
  }

  return (
    <div
      title="descrição"
      className="relative flex h-full flex-col space-y-1 px-5"
    >
      <label htmlFor="description">Descrição</label>
      <div className="relative h-full w-full">
        <textarea
          className="flex h-full w-full resize-none rounded py-1 px-2 pr-8"
          id="description"
          name="description"
          maxLength={1000}
          onChange={(e) => {
            const newOffer = structuredClone(props.offer);
            newOffer.Description = e.currentTarget.value;
            props.defineOfferSelected(newOffer);
          }}
          value={props.offer.Description}
        />
        {props.descriptions.length > 0 ? (
          <button
            className="absolute top-1 right-0 rounded bg-white px-2 py-1 shadow hover:bg-cyan-50"
            onClick={(e) => {
              e.preventDefault();
              changeDescription();
            }}
          >
            <svg
              className="h-5 w-5 fill-cyan-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
