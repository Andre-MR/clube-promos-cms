import { Dispatch, SetStateAction } from "react";
import { getOffers, QueryPeriods } from "../../database/queries/offers-queries";
import { FilterParameters } from "../../models/filter-parameters";
import Offer from "../../models/offer";
import { FilterOffers } from "../../utils/offers-sorter-filter";

type Props = {
  offers: Offer[];
  setOffers: Dispatch<SetStateAction<Offer[]>>;
  offersFiltered: Offer[];
  defineOffersFiltered: (offers: Offer[]) => void;
  defineOfferSelected: (offer: Offer) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
};

export default function ListFilterPeriod(props: Props) {
  return (
    <div className="flex w-full rounded border shadow shadow-gray-400">
      <select
        className="w-full p-1 text-sm"
        onChange={async (e) => {
          const queryPeriod = e.currentTarget.value as QueryPeriods;
          const newOffers = await getOffers(queryPeriod);
          if (newOffers) {
            const newFilterParameters = structuredClone(props.filterParameters);
            newFilterParameters.Period = queryPeriod;
            props.defineFilterParameters(newFilterParameters);
            const newOffersFiltered = FilterOffers(
              newFilterParameters,
              newOffers
            );
            props.defineOffersFiltered(newOffersFiltered);
            props.defineOfferSelected(newOffersFiltered[0] || new Offer());
            // const newFilterParameters = new FilterParameters();
            props.setOffers(newOffers);
          }
        }}
        value={props.filterParameters.Period}
      >
        <option key={1} value={QueryPeriods.Today}>
          Hoje
        </option>
        <option key={2} value={QueryPeriods.Days7}>
          7 dias
        </option>
        <option key={3} value={QueryPeriods.Days30}>
          30 dias
        </option>
        <option key={4} value={QueryPeriods.Years1}>
          1 ano
        </option>
        <option key={5} value={QueryPeriods.Week}>
          Esta semana
        </option>
        <option key={6} value={QueryPeriods.Month}>
          Este mês
        </option>
        <option key={7} value={QueryPeriods.Year}>
          Este ano
        </option>
      </select>
    </div>
  );
}
