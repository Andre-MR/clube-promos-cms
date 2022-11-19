import Campaign from "../../models/campaign";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  campaigns: Campaign[];
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterCampaign(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Campaign = e.currentTarget.value;
          props.defineFilterParameters(newFilterParameters);
          props.defineOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        value={props.filterParameters.Campaign}
      >
        <option key={0} value={FilterKeys.None}>
          Campanha
        </option>
        {props.campaigns.map((campaign) => {
          return (
            <option key={campaign.SK} value={campaign.Description}>
              {campaign.Description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
