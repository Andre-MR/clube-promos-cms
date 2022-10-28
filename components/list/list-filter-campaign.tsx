import { Dispatch, SetStateAction } from "react";
import Campaign from "../../models/campaign";
import Offer from "../../models/offer";
import { FilterKeys, FilterParameters } from "../../models/filter-parameters";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  campaigns: Campaign[];
  offers: Offer[];
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  filterParameters: FilterParameters;
  setFilterParameters: Dispatch<SetStateAction<FilterParameters>>;
};

export default function ListFilterCampaign(props: Props) {
  return (
    <div className="flex rounded border shadow shadow-gray-400">
      {/* <label htmlFor="priority">Loja</label> */}
      <select
        className="p-1 text-sm"
        onChange={(e) => {
          const newFilterParameters = structuredClone(props.filterParameters);
          newFilterParameters.Campaign = e.currentTarget.value;
          props.setFilterParameters(newFilterParameters);
          props.setOffersFiltered(
            FilterOffers(newFilterParameters, props.offers)
          );
        }}
        defaultValue={FilterKeys.None}
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
