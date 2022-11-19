import Offer from "../models/offer";
import { FilterParameters, SortKeys } from "../models/filter-parameters";
import SanitizeURL from "./sanitize-url";

function SortOffers(key: SortKeys, offers: Offer[]) {
  const filteredOffers = JSON.parse(JSON.stringify(offers)) as Offer[];

  switch (key) {
    case SortKeys.Expired:
      filteredOffers.sort((a, b) => {
        if (a.Expired < b.Expired) {
          return 1;
        }
        if (a.Expired > b.Expired) {
          return -1;
        }
        return 0;
      });
      break;
    case SortKeys.Updated:
      filteredOffers.sort((a, b) => {
        if (a.Updated < b.Updated) {
          return 1;
        }
        if (a.Updated > b.Updated) {
          return -1;
        }
        return 0;
      });
      break;
    default:
      filteredOffers.sort((a, b) => {
        if (a.Created < b.Created) {
          return 1;
        }
        if (a.Created > b.Created) {
          return -1;
        }
        return 0;
      });
  }
  return filteredOffers;
}

function FilterOffers(filterParameters: FilterParameters, offers: Offer[]) {
  let offersFiltered = structuredClone(offers);

  if (filterParameters.Title) {
    offersFiltered = offersFiltered.filter((offer) => {
      return SanitizeURL(offer.Title).includes(
        SanitizeURL(filterParameters.Title)
      )
        ? offer
        : null;
    });
  }

  if (filterParameters.Store) {
    offersFiltered = offersFiltered.filter((offer) => {
      return offer.Store.includes(filterParameters.Store) ? offer : null;
    });
  }

  if (filterParameters.Category) {
    offersFiltered = offersFiltered.filter((offer) => {
      return offer.Category == filterParameters.Category ? offer : null;
    });
  }

  if (filterParameters.Campaign) {
    offersFiltered = offersFiltered.filter((offer) => {
      return offer.Campaigns.includes(filterParameters.Campaign) ? offer : null;
    });
  }

  if (filterParameters.Active) {
    offersFiltered = offersFiltered.filter((offer) => {
      return !filterParameters.Active ||
        (offer.Active && filterParameters.Active == "Ativas") ||
        (!offer.Active && filterParameters.Active == "Inativas")
        ? offer
        : null;
    });
  }

  return SortOffers(filterParameters.Sort, offersFiltered);
}

export { FilterOffers, SortOffers };
