import Campaign from "../../models/campaign";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  campaigns: Campaign[];
};

export default function FormCampaigns(props: Props) {
  return (
    <div className="mx-5 flex h-full flex-col space-y-1">
      <label htmlFor="priority">Campanhas</label>
      <select
        className="h-full rounded py-1 px-1"
        multiple
        defaultValue={props.offer.Campaigns.map((campaign) => campaign)}
      >
        {props.campaigns.map((campaign) => {
          const selected = props.offer.Campaigns.includes(campaign.Description);
          return selected ? (
            <option
              className="bg-blue-500 text-white"
              key={campaign.SK}
              value={campaign.Description}
              onMouseDown={(e) => {
                e.preventDefault();
                var parentElement = e.currentTarget.parentElement!;
                const scrollPosition = parentElement.scrollTop;
                e.currentTarget.selected = !e.currentTarget.selected;
                e.currentTarget.classList.toggle("bg-blue-500");
                e.currentTarget.classList.toggle("text-white");
                setTimeout(() => {
                  parentElement.scrollTop = scrollPosition;
                }, 0);

                if (e.currentTarget.selected) {
                  const newOffer = structuredClone(props.offer);
                  newOffer.Campaigns.push(e.currentTarget.value);
                  props.defineOfferSelected(newOffer);
                }

                if (!e.currentTarget.selected) {
                  const newOffer = structuredClone(props.offer);
                  newOffer.Campaigns.slice(
                    newOffer.Campaigns.indexOf(e.currentTarget.value)
                  );
                  props.defineOfferSelected(newOffer);
                }
              }}
            >
              {campaign.Description}
            </option>
          ) : (
            <option
              className=""
              key={campaign.SK}
              value={campaign.Description}
              onMouseDown={(e) => {
                e.preventDefault();
                var parentElement = e.currentTarget.parentElement!;
                const scrollPosition = parentElement.scrollTop;
                e.currentTarget.selected = !e.currentTarget.selected;
                e.currentTarget.classList.toggle("bg-blue-500");
                e.currentTarget.classList.toggle("text-white");
                setTimeout(() => {
                  parentElement.scrollTop = scrollPosition;
                }, 0);

                if (e.currentTarget.selected) {
                  const newOffer = structuredClone(props.offer);
                  newOffer.Campaigns.push(e.currentTarget.value);
                  props.defineOfferSelected(newOffer);
                }

                if (!e.currentTarget.selected) {
                  const newOffer = structuredClone(props.offer);
                  newOffer.Campaigns.slice(
                    newOffer.Campaigns.indexOf(e.currentTarget.value)
                  );
                  props.defineOfferSelected(newOffer);
                }
              }}
            >
              {campaign.Description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
