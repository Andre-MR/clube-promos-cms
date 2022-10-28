import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
  setOfferSelected: Dispatch<SetStateAction<Offer>>;
};

export default function ListOffersHeader(props: Props) {
  const [filterParameters, setFilterParameters] = useState(
    new FilterParameters()
  );

  return (
    <div className="flex w-full items-center justify-between space-x-2 px-3">
      <div className="flex space-x-2">
        <ListFilterPeriod
          offers={props.offers}
          setOffers={props.setOffers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          setFilterParameters={setFilterParameters}
          setOfferSelected={props.setOfferSelected}
        />
        <ListFilterSort
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
      </div>
      <div className="flex space-x-2">
        <ListFilterActive
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
        <ListFilterStore
          stores={props.stores}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
        <ListFilterCategory
          categories={props.categories}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
        <ListFilterCampaign
          campaigns={props.campaigns}
          offers={props.offers}
          offersFiltered={props.offersFiltered}
          setOffersFiltered={props.setOffersFiltered}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
        />
        <div className="flex w-80">
          <ListFilterSearch
            offers={props.offers}
            offersFiltered={props.offersFiltered}
            setOffersFiltered={props.setOffersFiltered}
            filterParameters={filterParameters}
            setFilterParameters={setFilterParameters}
          />
        </div>
      </div>
    </div>
  );
}
