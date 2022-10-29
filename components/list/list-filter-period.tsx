import { Dispatch, SetStateAction } from "react";
import { getOffers, QueryPeriods } from "../../database/queries/offers-queries";
import { FilterParameters } from "../../models/filter-parameters";
import Offer from "../../models/offer";

type Props = {
  offers: Offer[];
  setOffers: Dispatch<SetStateAction<Offer[]>>;
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  setFilterParameters: Dispatch<SetStateAction<FilterParameters>>;
  setOfferSelected: Dispatch<SetStateAction<Offer>>;
};

export default function ListFilterPeriod(props: Props) {
  return (
    <div className="flex w-full rounded border shadow shadow-gray-400">
      <select
        className="w-full p-1 text-sm"
        onChange={async (e) => {
          const newOffers = await getOffers(
            e.currentTarget.value as QueryPeriods
          );
          if (newOffers) {
            props.setOfferSelected(newOffers[0]);
            const newFilterParameters = new FilterParameters();
            props.setFilterParameters(newFilterParameters);
            props.setOffers(newOffers);
            props.setOffersFiltered(newOffers);
          }
        }}
        defaultValue={QueryPeriods.Days7}
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
