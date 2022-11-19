import { Dispatch, SetStateAction } from "react";
import Campaign from "../../models/campaign";
import Category from "../../models/category";
import Offer from "../../models/offer";
import Store from "../../models/store";
import ListFilterCampaign from "./list-filter-campaign";
import ListFilterCategory from "./list-filter-category";
import ListFilterPeriod from "./list-filter-period";
import ListFilterSearch from "./list-filter-search";
import ListFilterSort from "./list-filter-sort";
import ListFilterStore from "./list-filter-store";
import { FilterParameters } from "../../models/filter-parameters";
import ListFilterActive from "./list-filter-active";

type Props = {
  offers: Offer[];
  setOffers: Dispatch<SetStateAction<Offer[]>>;
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
  defineOfferSelected: (offer: Offer) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListOffersHeader(props: Props) {
  return (
    <div className="flex w-full items-center justify-between space-x-2 px-3">
      <div className="flex space-x-2">
        <ListFilterPeriod
          offers={props.offers}
          setOffers={props.setOffers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
          defineOfferSelected={props.defineOfferSelected}
        />
        <ListFilterSort
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
        />
      </div>
      <div className="flex space-x-2">
        <ListFilterActive
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
        />
        <ListFilterStore
          stores={props.stores}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
        />
        <ListFilterCategory
          categories={props.categories}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
        />
        <ListFilterCampaign
          campaigns={props.campaigns}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          defineOffersFiltered={props.defineOffersFiltered}
          filterParameters={props.filterParameters}
          defineFilterParameters={props.defineFilterParameters}
        />
        <div className="flex w-80">
          <ListFilterSearch
            offers={props.offers}
            offersFiltered={props.offersFiltered}
            defineOffersFiltered={props.defineOffersFiltered}
            filterParameters={props.filterParameters}
            defineFilterParameters={props.defineFilterParameters}
          />
        </div>
      </div>
    </div>
  );
}
